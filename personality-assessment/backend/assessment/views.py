import os
import csv
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PersonalityResponse
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

PROFILES = {
    1: {
        "Extraversion": "Low",
        "Openness": "High",
        "Conscientiousness": "Low",
        "EmotionalStability": "High",
        "Agreeableness": "High",
        "Description": "This is someone who naturally prefers quiet settings and solitude. They are creative, curious, and remain open to new ideas. When it comes to work, they prefer flexibility and adapt well to unstructured tasks. In challenging situations, they remain resilient, calm, and composed under stress. Despite their quieter nature, they actively prioritize harmony and foster teamwork in group settings."
    },
    2: {
        "Extraversion": "High",
        "Openness": "Moderate",
        "Conscientiousness": "High",
        "EmotionalStability": "Moderate",
        "Agreeableness": "High",
        "Description": "This person is typically energized by social activities and groups. They take a balanced approach to new experiences, balancing curiosity with practicality. In their work, they are notably goal-driven, organized, and dependable. While they generally balance calmness with occasional stress, they consistently prioritize harmony and foster teamwork in their interactions."
    },
    3: {
        "Extraversion": "Moderate",
        "Openness": "High",
        "Conscientiousness": "Moderate",
        "EmotionalStability": "Moderate",
        "Agreeableness": "High",
        "Description": "This individual comfortably balances social interaction and solitude. They bring a creative and curious mindset, always open to new ideas. Their approach to tasks shows a good balance between structure and flexibility. Emotionally, they maintain a steady balance between calmness and occasional stress. In group settings, they naturally prioritize harmony and actively foster teamwork."
    },
    4: {
        "Extraversion": "Low",
        "Openness": "Low",
        "Conscientiousness": "High",
        "EmotionalStability": "Low",
        "Agreeableness": "Moderate",
        "Description": "This individual typically prefers quiet settings and solitude. When approaching new experiences, they favor routines and practical solutions. At work, they are notably goal-driven, organized, and dependable. While they may be sensitive to stress and experience emotional fluctuations, they tend to maintain a balanced approach, combining cooperation with assertiveness."
    },
    5: {
        "Extraversion": "High",
        "Openness": "High",
        "Conscientiousness": "Moderate",
        "EmotionalStability": "Moderate",
        "Agreeableness": "High",
        "Description": "This person is energized by social activities and groups. They show creativity and curiosity, staying consistently open to new ideas. In their work approach, they balance structure with flexibility. When facing challenges, they balance calmness with occasional stress. In group settings, they naturally prioritize harmony and actively foster teamwork."
    },
    6: {
        "Extraversion": "Low",
        "Openness": "High",
        "Conscientiousness": "High",
        "EmotionalStability": "Moderate",
        "Agreeableness": "Low",
        "Description": "This is someone who prefers quiet settings and solitude. They demonstrate creativity and curiosity, remaining open to new ideas. At work, they are goal-driven, organized, and dependable. While they balance calmness with occasional stress, they tend to focus on personal goals and communicate directly."
    },
    7: {
        "Extraversion": "Low",
        "Openness": "High",
        "Conscientiousness": "High",
        "EmotionalStability": "Low",
        "Agreeableness": "High",
        "Description": "While preferring quiet settings and solitude, this person shows strong creativity and curiosity, staying open to new ideas. They are goal-driven, organized, and dependable in their work. Though sensitive to stress and experiencing emotional fluctuations, they consistently prioritize harmony and foster teamwork."
    },
    8: {
        "Extraversion": "Moderate",
        "Openness": "Moderate",
        "Conscientiousness": "Moderate",
        "EmotionalStability": "Moderate",
        "Agreeableness": "High",
        "Description": "This individual effectively balances social interaction and solitude. They take a measured approach, balancing curiosity with practicality. In their work, they maintain a good balance between structure and flexibility. They handle pressure by balancing calmness with occasional stress, while naturally prioritizing harmony and fostering teamwork."
    },
    9: {
        "Extraversion": "High",
        "Openness": "Moderate",
        "Conscientiousness": "Low",
        "EmotionalStability": "High",
        "Agreeableness": "Moderate",
        "Description": "This person is energized by social activities and groups. They balance curiosity with practicality when approaching new situations. While preferring flexibility and adapting well to unstructured tasks, they remain resilient, calm, and composed under stress. They maintain a balanced approach, combining cooperation with assertiveness."
    },
    10: {
        "Extraversion": "High",
        "Openness": "Low",
        "Conscientiousness": "High",
        "EmotionalStability": "High",
        "Agreeableness": "High",
        "Description": "Energized by social activities and groups, this individual prefers routines and practical solutions. They are notably goal-driven, organized, and dependable. They maintain resilience and composure under stress, while consistently prioritizing harmony and fostering teamwork."
    },
    11: {
        "Extraversion": "Moderate",
        "Openness": "Moderate",
        "Conscientiousness": "High",
        "EmotionalStability": "Moderate",
        "Agreeableness": "High",
        "Description": "This person balances social interaction and solitude effectively. They approach new experiences by balancing curiosity with practicality. In their work, they are goal-driven, organized, and dependable. They balance calmness with occasional stress, while prioritizing harmony and fostering teamwork."
    },
    12: {
        "Extraversion": "Low",
        "Openness": "Moderate",
        "Conscientiousness": "High",
        "EmotionalStability": "Low",
        "Agreeableness": "High",
        "Description": "Preferring quiet settings and solitude, this individual balances curiosity with practicality. They are goal-driven, organized, and dependable. While sensitive to stress and experiencing emotional fluctuations, they consistently prioritize harmony and foster teamwork."
    },
    13: {
        "Extraversion": "Low",
        "Openness": "Moderate",
        "Conscientiousness": "Low",
        "EmotionalStability": "Moderate",
        "Agreeableness": "Moderate",
        "Description": "This person tends to prefer quiet settings and solitude. They take a balanced approach, combining curiosity with practicality. When it comes to tasks, they prefer flexibility and adapt well to unstructured situations. They balance calmness with occasional stress, while maintaining a balanced approach to cooperation and assertiveness."
    },
    14: {
        "Extraversion": "Moderate",
        "Openness": "High",
        "Conscientiousness": "Low",
        "EmotionalStability": "High",
        "Agreeableness": "Low",
        "Description": "Balancing social interaction and solitude, this individual shows creativity and curiosity, staying open to new ideas. They prefer flexibility and adapt well to unstructured tasks. While resilient, calm, and composed under stress, they tend to focus on personal goals and communicate directly."
    },
    15: {
        "Extraversion": "Moderate",
        "Openness": "High",
        "Conscientiousness": "High",
        "EmotionalStability": "High",
        "Agreeableness": "Moderate",
        "Description": "This person balances social interaction and solitude effectively. They show creativity and curiosity, remaining open to new ideas. At work, they are goal-driven, organized, and dependable. They maintain resilience and composure under stress, while balancing cooperation with assertiveness."
    },
    16: {
        "Extraversion": "Moderate",
        "Openness": "High",
        "Conscientiousness": "Moderate",
        "EmotionalStability": "Moderate",
        "Agreeableness": "Moderate",
        "Description": "Balancing social interaction and solitude, this person demonstrates creativity and curiosity, staying open to new ideas. They maintain a good balance between structure and flexibility in their work. They balance calmness with occasional stress, while combining cooperation with assertiveness."
    },
    17: {
        "Extraversion": "High",
        "Openness": "High",
        "Conscientiousness": "High",
        "EmotionalStability": "Low",
        "Agreeableness": "High",
        "Description": "This individual is energized by social activities and groups. They show creativity and curiosity, remaining open to new ideas. They are goal-driven, organized, and dependable. While sensitive to stress and experiencing emotional fluctuations, they consistently prioritize harmony and foster teamwork."
    },
    18: {
        "Extraversion": "High",
        "Openness": "High",
        "Conscientiousness": "High",
        "EmotionalStability": "Moderate",
        "Agreeableness": "Moderate",
        "Description": "Energized by social activities and groups, this person shows creativity and curiosity, staying open to new ideas. They are goal-driven, organized, and dependable. They balance calmness with occasional stress, while maintaining a balanced approach to cooperation and assertiveness."
    },
    19: {
        "Extraversion": "Low",
        "Openness": "Low",
        "Conscientiousness": "Moderate",
        "EmotionalStability": "High",
        "Agreeableness": "High",
        "Description": "This person prefers quiet settings and solitude. They favor routines and practical solutions when approaching new experiences. In their work, they balance structure with flexibility. They remain resilient, calm, and composed under stress, while consistently prioritizing harmony and fostering teamwork."
    }
}

@csrf_exempt
def get_profiles(request):
    if request.method == 'GET':
        return JsonResponse(PROFILES)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

def save_to_csv(data):
    # Create data directory if it doesn't exist
    data_dir = 'data'
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    
    # Define the CSV file path in the data directory
    csv_file_path = os.path.join(data_dir, 'responses.csv')
    
    # Define headers based on your data structure
    headers = [
        'participant_id', 'start_time', 'end_time',
        'personality_q1', 'personality_q2', 'personality_q3', 'personality_q4', 'personality_q5',
        'personality_q6', 'personality_q7', 'personality_q8', 'personality_q9', 'personality_q10',
        'profile1_decision', 'profile2_decision', 'profile3_decision', 'profile4_decision',
        'profile5_decision', 'profile6_decision', 'profile7_decision', 'profile8_decision',
        'profile9_decision', 'profile10_decision', 'profile11_decision', 'profile12_decision',
        'profile13_decision', 'profile14_decision', 'profile15_decision', 'profile16_decision',
        'profile17_decision', 'profile18_decision', 'profile19_decision',
        'final_profile_1', 'final_profile_2', 'final_profile_3', 'final_profile_4',
        'open_ended_q1', 'open_ended_q2',
        'prolific_id', 'task_condition', 'age', 'gender', 'education_level'
    ]
    
    # Check if file exists to determine if we need to write headers
    file_exists = os.path.isfile(csv_file_path)
    
    # Open file in append mode
    with open(csv_file_path, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=headers)
        
        # Write headers if file is new
        if not file_exists:
            writer.writeheader()
        
        # Write the data row
        writer.writerow(data)

@csrf_exempt
@require_http_methods(["POST"])
def save_response(request):
    try:
        # Parse the JSON data from request body
        data = json.loads(request.body)
        
        # Prepare data for CSV, ensuring all expected headers are present
        csv_data = {
            'participant_id': data.get('participant_id'),
            'start_time': data.get('start_time'),
            'end_time': data.get('end_time'),
            'prolific_id': data.get('prolific_id'),
            'task_condition': data.get('task_condition'),
            'age': data.get('age'),
            'gender': data.get('gender'),
            'education_level': data.get('education_level'),
            'open_ended_q1': data.get('open_ended_q1'),
            'open_ended_q2': data.get('open_ended_q2')
        }

        # Add personality questions
        for i in range(1, 11):
            csv_data[f'personality_q{i}'] = data.get(f'personality_q{i}')

        # Add profile decisions
        for i in range(1, 20): # Assuming 19 profiles
            csv_data[f'profile{i}_decision'] = data.get(f'profile{i}_decision', 'not_viewed')
        
        # Add final profile selections
        for i in range(1, 5):
            csv_data[f'final_profile_{i}'] = data.get(f'final_profile_{i}')

        # Save the data to CSV
        save_to_csv(csv_data)
        
        return JsonResponse({
            'status': 'success',
            'participant_id': data.get('participant_id')
        })
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)

@csrf_exempt
def save_selections(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('userId')  # You might want to add user identification
            yes_profiles = data.get('yesProfiles', [])
            maybe_profiles = data.get('maybeProfiles', [])
            
            # Store in a JSON file since we don't have a database setup
            selections_file = 'user_selections.json'
            
            # Read existing selections
            existing_selections = {}
            if os.path.exists(selections_file):
                with open(selections_file, 'r') as f:
                    existing_selections = json.load(f)
            
            # Update or add new selections
            existing_selections[user_id] = {
                'yes_profiles': yes_profiles,
                'maybe_profiles': maybe_profiles,
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            
            # Save back to file
            with open(selections_file, 'w') as f:
                json.dump(existing_selections, f, indent=2)
            
            return JsonResponse({
                'status': 'success',
                'message': 'Selections saved successfully'
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method'
    }, status=405)

@csrf_exempt
def get_selections(request):
    if request.method == 'GET':
        try:
            user_id = request.GET.get('userId')
            selections_file = 'user_selections.json'
            
            if not os.path.exists(selections_file):
                return JsonResponse({
                    'status': 'error',
                    'message': 'No selections found'
                }, status=404)
            
            with open(selections_file, 'r') as f:
                selections = json.load(f)
            
            user_selections = selections.get(user_id, {
                'yes_profiles': [],
                'maybe_profiles': [],
                'timestamp': None
            })
            
            return JsonResponse({
                'status': 'success',
                'data': user_selections
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method'
    }, status=405)

@csrf_exempt
def submit_final_selection(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('userId')
            final_profiles = data.get('finalProfiles', [])
            
            if len(final_profiles) != 4:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Must select exactly 4 profiles'
                }, status=400)
            
            # Store final selections
            final_selections_file = 'final_selections.json'
            
            existing_selections = {}
            if os.path.exists(final_selections_file):
                with open(final_selections_file, 'r') as f:
                    existing_selections = json.load(f)
            
            existing_selections[user_id] = {
                'final_profiles': final_profiles,
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            
            with open(final_selections_file, 'w') as f:
                json.dump(existing_selections, f, indent=2)
            
            return JsonResponse({
                'status': 'success',
                'message': 'Final selection saved successfully'
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method'
    }, status=405)