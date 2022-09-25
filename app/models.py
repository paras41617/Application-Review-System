from django.db import models

# Create your models here.

class Candidate(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=200)
    pic = models.FileField(upload_to='media/')
    resume = models.FileField(upload_to='media/')
    contact = models.IntegerField()
    status = models.CharField(max_length=20)

class Education(models.Model):
    candidate = models.ForeignKey(Candidate , on_delete=models.CASCADE , related_name='educations')
    title = models.CharField(max_length=100)
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    institution = models.CharField(max_length=100)
    grade = models.CharField(max_length=20)

class Experience(models.Model):
    candidate = models.ForeignKey(Candidate , on_delete=models.CASCADE , related_name='experiences')    
    role = models.CharField(max_length=100)
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    institution = models.CharField(max_length=100)
    type = models.CharField(max_length=20)

class Link(models.Model):
    candidate = models.ForeignKey(Candidate , on_delete=models.CASCADE , related_name='links')    
    title = models.CharField(max_length=50)
    url = models.CharField(max_length=300)