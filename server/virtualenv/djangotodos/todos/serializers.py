from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=200, required=True)

    class Meta:
        model = Task
        fields = '__all__'
