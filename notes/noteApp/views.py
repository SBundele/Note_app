from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
@api_view(["GET", "POST"])
def notes(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        serializers = NoteSerializer(notes, many=True)
        return Response(serializers.data)
    elif request.method == 'POST':
        serializers = NoteSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)