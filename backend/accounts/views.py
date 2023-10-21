from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from accounts.models import UserAccount


class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        print(f"{'-' * 5} {data}")
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if UserAccount.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'})
            else:
                if len(password) < 6:
                    return Response(
                        {'error': 'Password must be at least 6 characters'})
                else:
                    user = UserAccount.objects.create_user(
                        email=email, password=password, name=name
                    )
                    user.save()
                    return Response({'success': 'User created successfully'})
        else:
            return Response({'error': 'Passwords do not match'})
