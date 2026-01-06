from django.db import models

class Page(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Program(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    key_activities = models.TextField()

    def __str__(self):
        return self.name


class FocusArea(models.Model):
    program = models.ForeignKey(Program, related_name="focus_areas", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title


class HomepageSection(models.Model):
    section_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.section_name


class TrainingContent(models.Model):
    CONTENT_TYPE = (
        ('video', 'Video'),
        ('pdf', 'PDF'),
        ('text', 'Text'),
    )

    title = models.CharField(max_length=200)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Home page sections
class HomeHero(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    description = models.TextField(blank=True, null=True)
    primary_button = models.CharField(max_length=100)
    secondary_button = models.CharField(max_length=100)
    image = models.ImageField(upload_to="hero/", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CoreObjective(models.Model):
    section = models.CharField(max_length=200, blank=True, null=True)  # about intro, objectives,who we are
    description = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.section

class ProgramHome(models.Model):      # home and program section same API used
    section = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField() 
    title = models.CharField(max_length=200,blank=True, null=True)
    sub_description = models.TextField(blank=True, null=True)    
    key_activities = models.TextField(blank=True, null=True)
    target = models.CharField(max_length=100, blank=True, null=True)
    icon_url = models.URLField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.section, self.title


class ImpactStat(models.Model):
    section = models.CharField(max_length=200, blank=True, null=True) #about impact section
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.label


class Training(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class News(models.Model):                   # same model use for Upcoming Fundraising Events(Get involede section)
    section = models.CharField(max_length=100, blank=True, null=True) 
    phara = models.TextField(blank=True, null=True) 
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="news/", blank=True, null=True)
    publish_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    
# About Us Section

# class AboutIntro(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()

# class AboutObjective(models.Model):
#     title = models.CharField(max_length=150)
#     description = models.TextField()

class MissionVisionValue(models.Model):
    type = models.CharField(
        max_length=20,
        choices=[("mission", "Mission"), ("vision", "Vision"), ("value", "Value")]
    )
    icon_url = models.URLField(blank=True, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

class Leadership(models.Model):
    section = models.CharField(max_length=100, blank=True, null=True)  
    description = models.TextField(blank=True, null=True)
    name = models.CharField(max_length=100)
    sub_description = models.CharField(max_length=100, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to="leadership/")
    updated_at = models.DateTimeField(auto_now=True)

# # Journey / Milestones
# class Milestone(models.Model):
#     text = models.CharField(max_length=255)
    
    
class Geography(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    
# Project/imapct page API models
class ProjectCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
    
class Project(models.Model):
    category = models.ForeignKey(ProjectCategory, related_name="projects", on_delete=models.CASCADE)
    tag = models.CharField(max_length=100, blank=True, null=True) #Rural/Urban slum
    title = models.CharField(max_length=200)
    sub_description = models.TextField()
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    
    imapct_1_label = models.CharField(max_length=100, blank=True, null=True)
    imapct_1_value = models.CharField(max_length=50, blank=True, null=True)
    imapct_2_label = models.CharField(max_length=100, blank=True, null=True)
    imapct_2_value = models.CharField(max_length=50, blank=True, null=True)
    imapct_3_label = models.CharField(max_length=100, blank=True, null=True)
    imapct_3_value = models.CharField(max_length=50, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
#Get involved - Donation Model   
class Donation(models.Model):
    DONATION_TYPE_CHOICES = (
        ("one_time", "One Time"),
        ("monthly", "Monthly"),
    )

    PAYMENT_METHOD_CHOICES = (
        ("card", "Credit / Debit Card"),
        ("upi", "UPI"),
        ("netbanking", "Net Banking"),
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_type = models.CharField(max_length=20, choices=DONATION_TYPE_CHOICES)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)

    donor_name = models.CharField(max_length=100, blank=True, null=True)
    donor_email = models.EmailField(blank=True, null=True)
    donor_phone = models.CharField(max_length=15, blank=True, null=True)

    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"₹{self.amount} - {self.donation_type}"
    
    
class Volunteer(models.Model):
    AVAILABILITY_CHOICES = (
        ('weekdays', 'Weekdays'),
        ('weekends', 'Weekends'),
        ('evenings', 'Evenings'),
    )

    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    preferred_location = models.CharField(max_length=100, blank=True, null=True)
    skills_experience = models.TextField(blank=True, null=True)
    availability = models.JSONField()  # stores multiple values
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
    
class CorporatePartnershipSection(models.Model):
    section = models.CharField(max_length=100, blank=True, null=True)
    phara = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    
# Contact card model
class ContactCard(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    icon_url = models.URLField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    
