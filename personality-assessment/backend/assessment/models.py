from django.db import models

class PersonalityResponse(models.Model):
    # Participant Information
    participant_id = models.CharField(max_length=50)
    prolific_id = models.CharField(max_length=50, blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    # Personality Test Responses
    personality_q1 = models.IntegerField()  # Extraverted, enthusiastic
    personality_q2 = models.IntegerField()  # Critical, quarrelsome
    personality_q3 = models.IntegerField()  # Dependable, self-disciplined
    personality_q4 = models.IntegerField()  # Anxious, easily upset
    personality_q5 = models.IntegerField()  # Open to new experiences, complex
    personality_q6 = models.IntegerField()  # Reserved, quiet
    personality_q7 = models.IntegerField()  # Sympathetic, warm
    personality_q8 = models.IntegerField()  # Disorganized, careless
    personality_q9 = models.IntegerField()  # Calm, emotionally stable
    personality_q10 = models.IntegerField() # Conventional, uncreative

    # Profile Decisions
    profile1_decision = models.CharField(max_length=10)  # yes, no, maybe
    profile2_decision = models.CharField(max_length=10)
    profile3_decision = models.CharField(max_length=10)
    profile4_decision = models.CharField(max_length=10)
    profile5_decision = models.CharField(max_length=10)
    profile6_decision = models.CharField(max_length=10)
    profile7_decision = models.CharField(max_length=10)
    profile8_decision = models.CharField(max_length=10)
    profile9_decision = models.CharField(max_length=10)
    profile10_decision = models.CharField(max_length=10)
    profile11_decision = models.CharField(max_length=10)
    profile12_decision = models.CharField(max_length=10)
    profile13_decision = models.CharField(max_length=10)
    profile14_decision = models.CharField(max_length=10)
    profile15_decision = models.CharField(max_length=10)
    profile16_decision = models.CharField(max_length=10)
    profile17_decision = models.CharField(max_length=10)
    profile18_decision = models.CharField(max_length=10)
    profile19_decision = models.CharField(max_length=10)

    # Final Team Selection
    final_profile_1 = models.IntegerField()
    final_profile_2 = models.IntegerField()
    final_profile_3 = models.IntegerField()
    final_profile_4 = models.IntegerField()

    # Open-ended Responses
    open_ended_q1 = models.TextField()  # Qualities focused on
    open_ended_q2 = models.TextField()  # Personal influence

    # Prolific Completion
    prolific_completion_code = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"Response from Participant {self.participant_id}"

    class Meta:
        db_table = 'personality_responses'