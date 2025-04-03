from django.urls import path
from . import views

urlpatterns = [
    path('profiles/', views.get_profiles, name='get_profiles'),
    path('save-response/', views.save_response, name='save_response'),
    path('selections/', views.save_selections, name='save_selections'),
    path('get-selections/', views.get_selections, name='get_selections'),
    path('final-selection/', views.submit_final_selection, name='submit_final_selection'),
]