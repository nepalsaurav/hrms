from django import forms
from django.utils.safestring import mark_safe

class TrixEditor(forms.Textarea):
    def __init__(self, attrs=None):
        default_attrs = {'class': 'trix-content'}
        if attrs:
            default_attrs.update(attrs)
        super().__init__(default_attrs)

    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = ''
        return mark_safe(f'<trix-editor input="{name}_trix_input"></trix-editor><input id="{name}_trix_input" class="trix_input" type="hidden" name="{name}" value="{value}">')
