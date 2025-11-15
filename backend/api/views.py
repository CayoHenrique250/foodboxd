from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class UserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):

        serializer = UserSerializer(request.user)
        return Response(serializer.data)
