from django.urls import path  # noqa
from .views import SignupView

urlpatterns = [
    path('signup/', SignupView.as_view()),
]
