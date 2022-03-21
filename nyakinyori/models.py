from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
# Create your models here.


class Person(MPTTModel):
    name = models.CharField(max_length=50)
    parent = TreeForeignKey('self',
                            on_delete=models.CASCADE,
                            null=True,
                            blank=True,
                            related_name='children')
    gender = models.CharField(max_length=6, blank=False, null=False)
    partner = models.CharField(max_length=50, blank=True, null=True)

    def as_dict(self):
        parent = self.get_ancestors(ascending=True).first()
        return {
            "id":
            self.id,
            "name":
            self.name,
            "gender":
            self.gender,
            "partner":
            self.partner,
            "parent":
            f"{parent.name} {'and ' + parent.partner if parent.partner else ''}"
            if parent else ''
        }

    def __unicode__(self):
        if self.partner:
            return f"{self.name} and {self.partner} parent {self.parent}"
        return self.name

    def __str__(self):
        if self.partner:
            return f"{self.name} and {self.partner} parent {self.parent}"
        return f"{self.name} parent {self.parent}"

    def change_form(self):
        parent = self.get_ancestors(ascending=True).first()
        return {
            "id":
            self.id,
            "name":
            self.name,
            "gender":
            self.gender,
            "partner":
            self.partner,
            "parent": {
                "name":
                f"{parent.name} {'and ' + parent.partner if parent.partner else ''}"
                if parent else '',
                "id":
                parent.id if parent else ""
            },
            "children": [{
                "id": obj.id,
                "name": obj.name
            } for obj in self.get_children()]
        }

    class Meta:
        ordering = ('name', )

    class MPTTMeta:
        order_insertion_by = ['id']
