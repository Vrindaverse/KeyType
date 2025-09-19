# api/authentication.py
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication

class EmailOrUsernameJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        username_or_email = request.data.get("identifier")
        password = request.data.get("password")
        if "@" in username_or_email:
            from django.contrib.auth.models import User
            try:
                username = User.objects.get(email=username_or_email).username
            except User.DoesNotExist:
                return None
        else:
            username = username_or_email

        user = authenticate(request, username=username, password=password)
        if user is None:
            return None
        return (user, None)
