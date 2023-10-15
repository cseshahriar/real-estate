from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status

User = get_user_model()


class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        name = data.get('name', None)
        email = data.get('email', None)
        password = data.get('password', None)
        password2 = data.get('password2', None)

        if not name:
            return Response(
                {'error': 'Please enter a name.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not email:
            return Response(
                {'error': 'Please enter an email address.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not password:
            return Response(
                {'error': 'Please enter a password.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(password) < 6:
            return Response(
                {'error': 'Password must be at least 6 characters.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not password2:
            return Response(
                {'error': 'Please confirm your password.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if password != password2:
            return Response(
                {'error': 'Passwords do not match.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        qs = User.objects.filter(email=email)
        if qs.exists():
            return Response(
                {'error': 'Username is already taken.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        qs = User.objects.filter(email=email)
        if qs.exists():
            return Response(
                {'error': 'Email is already taken.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create(name=name, email=email)
        user.set_password(password)
        user.save()

        return Response(
            {'success': 'User created successfully.'},
            status=status.HTTP_201_CREATED
        )
