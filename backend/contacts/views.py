from rest_framework import permissions
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from .models import Contact
from rest_framework.response import Response



class ContactCreateView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        try:
            name =  data['name']
            subject =  data['subject']
            message = data['message']
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [data['email']]
            send_mail(
                subject,
                'Name: '
                + name
                + '\nEmail: '
                + data['email']
                + '\n\nMessage:\n'
                + message,
                from_email,
                recipient_list,  # noqa
                fail_silently=False
            )
            return Response({'success': 'Message sent successfully'})
        except Exception as e:
            print(f"exception {e}")
            return Response({'error': 'Message failed to send'})
