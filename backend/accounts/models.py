from django.db import models
from django.contrib.auth.models import (  # noqa
    AbstractBaseUser, PermissionsMixin, BaseUserManager  # noqa
)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """ Custom user model """
    email = models.EmailField(max_length=255, unique=True)
