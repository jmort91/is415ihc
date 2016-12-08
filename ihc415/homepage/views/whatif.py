import urllib.request
import json
from django.conf import settings
from django import forms
from django.forms.models import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect
from django_mako_plus import view_function
from .. import dmp_render_to_string, dmp_render
import re


@view_function
def process_request(request):
    '''this is the only thing here, it submits form stuff to talk to my API, which returns a response.'''

    form = predictForm() #form object

    if request.method == 'POST':
        form = predictForm(request.POST)

        return HttpResponseRedirect('/homepage/whatif/')

    template_vars = {
    'form': form,
    }
    return dmp_render(request, 'whatif.html', template_vars)



@view_function
def prediction(request):
    '''This is to actually call the API and return the prediction to the webpage. Called by JavaScript.'''
    # this next part is copied from the Azure site, I'm not quite sure where to put it just yet, but it will be in the right place eventually
    if request.urlparams[1] == "36months": #had to remove the space to pass it in the URL. This works around that so the API reads it correctly.
        term_cleaned = "36 months"
    else:
        term_cleaned = "60 months"
data = {
        "Inputs": {
                "input1":
                [
                    {
                            'DIFFICULTY': "",   
                            'PRIORITY': "",   
                            'DURATION_(WEEKS)': "1",   
                            'PHYSICIAN_INVOLVEMENT_FLAG_YES': "",   
                            'PHYSICIAN_LED_FLAG_YES': "",   
                            'FACILITY': "",   
                    }
                ],
        },
    "GlobalParameters":  {
    }
}

body = str.encode(json.dumps(data))

url = 'https://ussouthcentral.services.azureml.net/workspaces/8a916c82e3cc47ad822f34245ae686f8/services/5a7b2d8d2dc146c8b5f17b35dfa308f6/execute?api-version=2.0&format=swagger'
api_key = 'abc123' # Replace this with the API key for the web service
headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}

req = urllib.request.Request(url, body, headers)

try:
    response = urllib.request.urlopen(req)

    result = response.read()
    print(result)
except urllib.error.HTTPError as error:
    print("The request failed with status code: " + str(error.code))

    # Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
    print(error.info())
    print(json.loads(error.read().decode("utf8", 'ignore')))
import urllib.request
import json

data = {
        "Inputs": {
                "input1":
                [
                    {
                            'DIFFICULTY': "",   
                            'PRIORITY': "",   
                            'DURATION_(WEEKS)': "1",   
                            'PHYSICIAN_INVOLVEMENT_FLAG_YES': "",   
                            'PHYSICIAN_LED_FLAG_YES': "",   
                            'FACILITY': "",   
                    }
                ],
        },
    "GlobalParameters":  {
    }
}

body = str.encode(json.dumps(data))

url = 'https://ussouthcentral.services.azureml.net/workspaces/8a916c82e3cc47ad822f34245ae686f8/services/5a7b2d8d2dc146c8b5f17b35dfa308f6/execute?api-version=2.0&format=swagger'
api_key = 'X3BtMcecWiUDlO4ZLHPplscdiDIkOyvJXGCvbnWpOYiJQfbP/IXnIKdf5/dSOJqCLLrxqGp3lms4vuCN93pGvQ==' # Replace this with the API key for the web service
headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}

req = urllib.request.Request(url, body, headers)

try:
    response = urllib.request.urlopen(req)

    result = response.read()
    print(result)
except urllib.error.HTTPError as error:
    print("The request failed with status code: " + str(error.code))

    # Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
    print(error.info())
    print(json.loads(error.read().decode("utf8", 'ignore')))





class predictForm(forms.Form):
    '''The prediction sumbission form'''
    'DIFFICULTY_CHOICES' = ( #to choose between the difficulties
    ('Easy', 'Easy'),
    ('Medium', 'Medium'),
    ('Hard', 'Hard'),
    ('', 'Blanks'),)

    'PRIORITY_CHOICES' = ( #to choose priority
    ('Low', 'Low'),
    ('Medium', 'Medium'),
    ('High', 'High'),
    ('Unknown', 'Unknown'),
    ('Zero', 'Zero'),)

    'PHYSICIAN_INVOLVEMENT_FLAG_YES_CHOICES' = ( #to choose involvement flag
    ('Yes', 'Yes'),
    ('No', 'No'),)

    'PHYSICIAN_LED_FLAG_YES_CHOICES' = ( #to choose led flag
    ('Yes', 'Yes'),
    ('No', 'No'),)

    'FACILITY_CHOICES' = ( #to choose priority
    ('Bear River', 'Bear River'),
    ('Cassia', 'Cassia'),
    ('Logan', 'Logan'),
    ('McKay-Dee', 'McKay-Dee'),
    ('RCO', 'RCO'),
    ('Risk Mgmt', 'Risk Mgmt'),)

    DIFFICULTY = forms.ChoiceField(label='DIFFICULTY', choices=DIFFICULTY_CHOICES, widget=forms.Select(attrs={'id': 'DIFFICULTY'}))
    PRIORITY = forms.ChoiceField(label='PRIORITY', choices=PRIORITY_CHOICES, widget=forms.Select(attrs={'id': 'PRIORITY'}))
    DURATION = forms.CharField(label='DURATION_(WEEKS)',max_length=100,widget=forms.TextInput(attrs={'id': 'DURATION_(WEEKS)'}))
    PHYSICIAN_INVOLVEMENT_FLAG_YES = forms.ChoiceField(label='PHYSICIAN_INVOLVEMENT_FLAG_YES', choices=PHYSICIAN_INVOLVEMENT_FLAG_YES_CHOICES, widget=forms.Select(attrs={'id': 'PHYSICIAN_INVOLVEMENT_FLAG_YES'}))
    PHYSICIAN_LED_FLAG_YES = forms.ChoiceField(label='PHYSICIAN_LED_FLAG_YES', choices=PHYSICIAN_LED_FLAG_YES_CHOICES, widget=forms.Select(attrs={'id': 'PHYSICIAN_LED_FLAG_YES'}))
    FACILITY = forms.ChoiceField(label='FACILITY', choices=FACILITY_CHOICES, widget=forms.Select(attrs={'id': 'FACILITY'}))


