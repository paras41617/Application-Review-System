from http.client import HTTPResponse
from urllib import response
from django.shortcuts import render
from .models import Candidate , Experience , Education , Link
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.

@csrf_exempt
@api_view(['POST'])
def create_candidate(request):
    first_name = request.data['first_name']
    last_name = request.data['last_name']
    email = request.data['email']
    status = "applied"
    resume = request.data['resume']
    pic = request.data['pic']
    contact = request.data['contact']
    candidate = Candidate(first_name = first_name , last_name = last_name , email = email , status = status , contact = contact , resume = resume , pic = pic)
    candidate.save()
    return Response({'id' : candidate.id})

@csrf_exempt
@api_view(['POST'])
def create_education(request):
    title = request.POST['title']
    start_year = request.data['start_year']
    end_year = request.data['end_year']
    grade = request.data['grade']
    institution = request.data['institution']
    candidate = Candidate.objects.filter(id = request.data['id'])
    education = Education(title = title , start_year = start_year , end_year = end_year , grade = grade , institution = institution , candidate = candidate[0])
    education.save()
    candidate[0].educations.add(education)
    return Response("success")

@csrf_exempt
@api_view(['POST'])
def create_experience(request):
    role = request.data['role']
    start_year = request.data['start_year']
    end_year = request.data['end_year']
    type = request.data['type']
    institution = request.data['institution']
    candidate = Candidate.objects.filter(id = request.data['id'])
    experience = Experience(role = role , start_year = start_year , end_year = end_year , type = type , institution = institution , candidate = candidate[0])
    experience.save()
    candidate[0].experiences.add(experience)
    return Response("success")

@csrf_exempt
@api_view(['POST'])
def create_link(request):
    title = request.data['title']
    url = request.data['url']
    candidate = Candidate.objects.filter(id = request.data['id'])
    link = Link(title = title , url = url , candidate = candidate[0])
    link.save()
    candidate[0].links.add(link)
    return Response("success")

@csrf_exempt
@api_view(['GET'])
def show_candidates(request):
    all_candidates = Candidate.objects.all().values()
    return Response({'all_candidates' : all_candidates})

@csrf_exempt
@api_view(['POST'])
def show_detail(request):
    candidate = Candidate.objects.filter(id = request.data['id'])
    exps = candidate[0].experiences.all().values()
    edus = candidate[0].educations.all().values()
    links = candidate[0].links.all().values()
    return Response({'experiences' : exps , 'educations' : edus , 'links' : links})

@csrf_exempt
@api_view(['POST'])
def change_status(request):
    candidate = Candidate.objects.filter(id = request.POST['id'])
    status = request.data['status']
    ans = candidate[0]
    ans.status = status
    ans.save()
    return Response("success")
