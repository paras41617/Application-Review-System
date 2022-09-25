from rest_framework import serializers

from.models import Candidate , Education , Experience , Link

class CandidateSerializer(serializers.ModelSerializer):
   class Meta:
       model = Candidate
       fields = ('first_name', 'last_name', 'email', 'pic' , 'resume' , 'contact' , 'status')   

class ExperienceSerializer(serializers.ModelSerializer):
   class Meta:
       model = Experience
       fields = ('role', 'start_year', 'end_year', 'institution' , 'type') 

class EducationSerializer(serializers.ModelSerializer):
   class Meta:
       model = Education
       fields = ('Title', 'start_year', 'end_year', 'institution' , 'grade') 

class CandidateSerializer(serializers.ModelSerializer):
   class Meta:
       model = Link
       fields = ('title', 'url') 