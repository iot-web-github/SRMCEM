from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer, LoginSerializer

class SignupView(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        s = SignupSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response({"detail": "User created"}, status=status.HTTP_201_CREATED)
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        s = LoginSerializer(data=request.data)
        if s.is_valid():
            return Response({"detail": "Login ok"}, status=status.HTTP_200_OK)
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
