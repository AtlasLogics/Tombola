"""
Form the JSON that we need
"""
import pdb
import random
from random import sample
from rest_framework import serializers
from play.models import Row, Card, Ball, Combinations

        
def card_data(card):

    primo = list(range(1,10))
    random.shuffle(primo)

    secondo = list(range(10,20))
    random.shuffle(secondo)

    terzo = list(range(20,30))
    random.shuffle(terzo)

    quarto = list(range(30,40))
    random.shuffle(quarto)

    quinto  = list(range(40,50))
    random.shuffle(quinto)

    sesto = list(range(50,60))
    random.shuffle(sesto)

    settimo = list(range(60,70))
    random.shuffle(settimo)


    ottavo = list(range(70,80))
    random.shuffle(ottavo)

    nono = list(range(80,90))
    random.shuffle(nono)

    numbers = [primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono]


    first_row = []
    second_row = []
    third_row = []
    rows = [first_row, second_row, third_row]

    empty_values = []
    for x in range(3):
        rowx = sample(range(9), k = 5)
        rowx.sort()
        full_list = list(range(0,9))

        for r in rowx:
            selected_column = numbers[r]
            number = selected_column.pop()
            rows[x].append(number)


        f = 0
        for h in range(0,9):
            if h not in rowx:
                full_list[h] = 0
                continue
            full_list[h] = rows[x][f]
            f+=1


        casella = Row.objects.create(b_val=full_list[0],i_val=full_list[1], n_val=full_list[2], g_val=full_list[3], o_val=full_list[4], v0_val=full_list[5], v1_val=full_list[6], v2_val=full_list[7], v3_val=full_list[8], card=card, valore=0)
        casella.save()

       

class CombinationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Combinations
        fields = ['ambo', 'terno', 'quaterna', 'cinquina', 'tombola']
        depth = 1

    def to_representation(self, instance):
        """ Get rid of excess data, makes it easier to consume on the client """
        ret = super().to_representation(instance)
        mapp = []
        ret1 = ret.copy()
        for comb in ret1:
            a = str(comb)
            s = ret.pop(a)
            mapp.append({a:s})
        return mapp
        #return ",".join([str(element) for element in ret])
      

class CardSerializer(serializers.ModelSerializer):
    """ card JSON """
    class Meta:
        model = Card
        fields = ['id', 'created_on', 'rows']
        depth = 1

    def create(self, validated_data):
        card = Card.objects.create(**validated_data)
        card_data(card)
        card.save()
        return card

    def to_representation(self, instance):
        """ Get rid of excess data, makes it easier to consume on the client """
        ret = super().to_representation(instance)
        for row in ret['rows']:
            row.pop('card')
            row.pop('id')
        return ret

class BallSerializer(serializers.ModelSerializer):
    """ serializes and validates balls """
    class Meta:
        """ ball json """
        model = Ball
        fields = ['num_value', 'updated_at', 'is_played']

    def to_representation(self, instance):
        """ Get rid of excess data, makes it easier to consume on the client """
        ret = super().to_representation(instance)
        ret.pop('updated_at')
        ret.pop('is_played')
        return ret
