from django.db import models


# Model for signup page
class UserSignup(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


# Model for login page
class UserLogin(models.Model):
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=128)
    login_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} logged in at {self.login_time}"
