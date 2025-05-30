from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email',
            'phone_number', 'address', 'user_type', 'company_name', 'password'
        ]
        extra_kwargs = {
            'email': {'required': True, 'allow_blank': False},
            'username': {'required': True, 'allow_blank': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user 