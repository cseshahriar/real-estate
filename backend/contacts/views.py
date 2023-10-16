from rest_framework import permissions
from rest_framework.views import APIView
from .models import Contact
from django.core.mail import send_mail
from rest_framework.response import Response


class ContactCreateView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        try:
            send_mail(
                data['subject'],  # noqa
                'Name: '  # noqa
                + data['name']  # noqa
                + '\nEmail: '  # noqa
                + data['email']  # noqa
                + '\n\nMessage:\n'  # noqa
                + data['message'],  # noqa
                '[YOUR SENDER EMAIL FROM YOUR SETTINGS]',
                ['[EMAIL YOU ARE SENDING TO]'],
                fail_silently=False
            )

            contact = Contact(
                ame=data['name'], email=data['email'], subject=data['subject'],
                message=data['message']
            )
            contact.save()
            return Response({'success': 'Message sent successfully'})
        except Exception:
            return Response({'error': 'Message failed to send'})
