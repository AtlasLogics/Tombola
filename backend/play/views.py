from os import system
import random
from random import randint
from django.http import JsonResponse
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework import generics
from play.models import Card, Ball, Row, Combinations
from play.serializers import CardSerializer, BallSerializer, CombinationsSerializer
class BallList(generics.ListAPIView):
    queryset = Ball.objects.filter(is_played=True).order_by('updated_at')
    serializer_class = BallSerializer


class CombinationsList(generics.ListCreateAPIView):
    """ Get or create cards """
    queryset = Combinations.objects.all()
    serializer_class = CombinationsSerializer

class CardList(generics.ListCreateAPIView):
    """ Get or create cards """
    http_method_names = ['get']
    queryset = Card.objects.all()
    serializer_class = CardSerializer



def reset_balls_private():
    """ Clear balls status and delete old tasks """
    Ball.objects.all().update(
        is_played=False,
        updated_at=timezone.now()
    )
    Combinations.objects.all().update(
        ambo = [],
        terno = [],
        quaterna = [],
        cinquina = [],
        tombola = [],
    )
    Row.objects.all().update(
        valore = 0
    )
    
    


api_view(['GET'])
def reset_balls(request):
    """ Clear balls status and delete old tasks """
    reset_balls_private()

    
    return JsonResponse({'ok':""}, status=200)

@api_view(['GET'])
def blow_balls(request):
    a = blow_balls_private()
    #combinations = Combinations.objects.all()[0]
    #print(combinations.ambo)
    return JsonResponse({'ball-blown':a}, status=200)


dictionary = {}
def checkCombinations(a):
    
    cards = Row.objects.all()#row objects is random
    combinations = Combinations.objects.all()[0]
    to_reset = 0
    tombola = 0

    #print(dictionary)
    for r in cards:
        b = int(r.b_val)
        i = int(r.i_val)
        n = int(r.n_val)
        g = int(r.g_val)
        o = int(r.o_val)
        v = int(r.v0_val)
        v1 = int(r.v1_val)
        v2 = int(r.v2_val)
        v3 = int(r.v3_val)
       
        if(r.card.id not in dictionary):
            dictionary[r.card.id] = 0

        if(b == a or i == a or n == a or g == a or  o == a or v == a or v1 == a or v2 == a or v3 == a):
            r.valore = r.valore + 1

            if(r.valore == 2 and r.card.id not in combinations.ambo):
                combinations.ambo.append(r.card.id)
            
            if(r.valore == 3 and r.card.id not in combinations.terno):
                combinations.terno.append(r.card.id)
            
            if(r.valore == 4 and r.card.id not in combinations.quaterna):
                combinations.quaterna.append(r.card.id)
                
            if(r.valore == 5 ):
                if(r.card.id not in combinations.cinquina):
                    combinations.cinquina.append(r.card.id) 
                
                dictionary[r.card.id] = dictionary[r.card.id] + 1
        
    
        if(dictionary[r.card.id] > 2 and r.card.id not in combinations.tombola):
            combinations.tombola.append(r.card.id)
            print("TOMBOLA")

        combinations.save()
        r.save()
# Create your views here.

def blow_balls_private():
    """ moves ball from unplayed status to played """
    balls = Ball.objects.filter(is_played=False)
    max_index = len(balls)-1
    if max_index >= 0:
        my_index = randint(0, max_index)
        ball = balls[my_index]
        ball.is_played = True
        ball.save()
        checkCombinations(ball.num_value)
        #inser here the blowball
        print("Ball Blown: ", ball.num_value)
        return ball.num_value
    return -1
# Create your views here.'''


