"""familyTree URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from nyakinyori.views import AdminView, ShowOutput

urlpatterns = [
    path('defaultadmin/', admin.site.urls),
    # path('', TemplateView.as_view(template_name="db_add.html"), name="db_add"),
    path('ajaxdeal/', AdminView.as_view(), name="ajaxdeal"),
    path('admin/', AdminView.as_view(), name="ajaxdeal"),
    path('', ShowOutput.as_view(), name="family"),

]
