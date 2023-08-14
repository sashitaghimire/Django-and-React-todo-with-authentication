
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Task
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def taskList(request):
    tasks = Task.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def taskDetail(request, pk):
    task = get_object_or_404(Task, id=pk)
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def taskUpdate(request, pk):
    task = get_object_or_404(Task, id=pk)
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def taskDelete(request, pk):
    task = get_object_or_404(Task, id=pk)
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Todo succsesfully delete')
