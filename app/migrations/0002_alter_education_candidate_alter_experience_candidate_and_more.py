# Generated by Django 4.1.1 on 2022-09-25 08:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='candidate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='educations', to='app.candidate'),
        ),
        migrations.AlterField(
            model_name='experience',
            name='candidate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experiences', to='app.candidate'),
        ),
        migrations.AlterField(
            model_name='links',
            name='candidate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='links', to='app.candidate'),
        ),
    ]