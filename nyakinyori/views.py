from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from nyakinyori.models import Person

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
import string


# Create your views here.


@method_decorator(csrf_exempt, name='dispatch')
class AdminView(View):
    template_name = "db_add.html"

    def post(self, request, *args, **kwargs):
        requestBody = json.loads(request.body)
        if (requestBody.get("purpose") == "more"):
            if requestBody.get("parents"):
                if "&&" in requestBody.get("parents"):
                    parent = Person.objects.filter(name=requestBody.get("parents").split(
                        " && ")[0], partner=requestBody.get("parents").split(" && ")[1]).first()
                else:

                    parent = Person.objects.filter(name=requestBody.get("parents")).first()
            else:
                parent = None

            person_added = Person.objects.create(name=string.capwords(requestBody.get("name")), gender=string.capwords(requestBody.get(
                "gender")), partner=string.capwords(requestBody.get("partner")), parent=parent)
            print(person_added)

            return JsonResponse({"person_added": person_added.name})
        elif (requestBody.get("purpose") == "load_couples"):
            query = [obj.as_dict() for obj in Person.objects.all()]
            return JsonResponse({"couples": query})
        elif (requestBody.get("purpose") == "get_person"):
            person = Person.objects.get(id=int(requestBody.get("person_id"))).get_family()
            return render(request, "tree.html", {"genres": person})
        elif (requestBody.get("purpose") == "reset"):
            return render(request, "tree.html", {"genres": Person.objects.all()})
        elif (requestBody.get("purpose") == "change_form"):
            person = Person.objects.get(id=int(requestBody.get("person_id"))).change_form()
            return JsonResponse(person)
        elif (requestBody.get("purpose") == "delete_user"):
            Person.objects.get(id=int(requestBody.get("person_id"))).delete()
            return JsonResponse({})
        elif (requestBody.get("purpose") == "arrange_fam"):
            Person.objects.rebuild()
            return JsonResponse({})
        elif (requestBody.get("purpose") == "update_user"):
            person = Person.objects.filter(id=int(requestBody.get("person_id"))).update(name=requestBody.get(
                "name"), partner=requestBody.get("partner"), gender=requestBody.get("gender"))
            return JsonResponse({})

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class ShowOutput(View):
    def get(self, request, *args, **kwargs):
        # Person.objects.rebuild()
        return render(request, "family.html", {'genres': Person.objects.all()})
