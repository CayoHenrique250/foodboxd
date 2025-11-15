from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'last_name']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(
        write_only=True, required=True, label="Confirm Password")
    first_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name']

    def validate(self, attrs):

        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "As senhas não coincidem."})

        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError(
                {"email": "Usuário com este e-mail já existe."})

        return attrs

    def create(self, validated_data):

        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data.get('last_name', '')
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
