from django.db import models
from django.contrib.postgres.fields import ArrayField

class Ball(models.Model):
    num_value = models.IntegerField()
    updated_at = models.DateTimeField(null=True)
    is_played = models.BooleanField(default=False)

    
    def __str__(self):
       return self.num_value

class Combinations(models.Model):
    ambo = ArrayField(models.IntegerField(), blank=True)
    terno = ArrayField(models.IntegerField(), blank=True)
    quaterna = ArrayField(models.IntegerField(), blank=True)
    cinquina = ArrayField(models.IntegerField(), blank=True)
    tombola =  ArrayField(models.IntegerField(), blank=True)


    def __str__(self):
        a = ", ".join(str(k) for k in self.ambo)
        return a

class Card(models.Model):
    """ A bingo card with 5 rows. """
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'play'

    def __str__(self):
        return "Card: " + str(self.id) + ", " + str(self.created_on)

class Row(models.Model):
    """ Each property is a column on a bingo card, should have 5 rows per card """
    b_val = models.CharField(max_length=3)
    i_val = models.CharField(max_length=3)
    n_val = models.CharField(max_length=3)
    g_val = models.CharField(max_length=3)
    o_val = models.CharField(max_length=3)
    v0_val = models.CharField(max_length=3)
    v1_val = models.CharField(max_length=3)
    v2_val = models.CharField(max_length=3)
    v3_val = models.CharField(max_length=3)
    
    valore = models.IntegerField()


    card = models.ForeignKey(
        'Card',
        on_delete=models.CASCADE,
        related_name='rows')
    
    class Meta:
        app_label = 'play'


    def __str__(self):
        return self.b_val + " " + self.i_val + " " + self.n_val + " " + self.g_val + " " + self.o_val + " " + self.v0_val + " " + self.v1_val + " " + self.v2_val +" " + self.v3_val

