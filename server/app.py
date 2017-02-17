from flask import Flask, jsonify
from flask_restful import reqparse, abort, Resource, Api
from flask_cors import CORS, cross_origin

import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors


# APP SETUP
app = Flask(__name__)
CORS(app)
api = Api(app)
# END APP SETUP


# BUSINESS LOGIC
class User(object):
    posTeamAttribAssoc = {
        "LW": {
            "attack": 100,
            "mid": 30,
            "defence": 20
        },
        "ST": {
            "attack": 100,
            "mid": 20,
            "defence": 10
        },
        "RW": {
            "attack": 100,
            "mid": 30,
            "defence": 20
        },
        "RM": {
            "attack": 30,
            "mid": 100,
            "defence": 20
        },
        "CM": {
            "attack": 40,
            "mid": 100,
            "defence": 30
        },
        "LM": {
            "attack": 30,
            "mid": 100,
            "defence": 20
        },
        "LB": {
            "attack": 20,
            "mid": 20,
            "defence": 100
        },
        "LCB": {
            "attack": 10,
            "mid": 20,
            "defence": 100
        },
        "RCB": {
            "attack": 10,
            "mid": 20,
            "defence": 100
        },
        "RB": {
            "attack": 10,
            "mid": 20,
            "defence": 100
        },
        "GK": {
            "attack": 0,
            "mid": 0,
            "defence": 100
        }
    }

    attribScale = {
        "attack" : sum(pos["attack"] for pos in posTeamAttribAssoc.values()),
        "mid" : sum(pos["mid"] for pos in posTeamAttribAssoc.values()),
        "defence" : sum(pos["defence"] for pos in posTeamAttribAssoc.values())
    }

    teamAttribAssoc = {
        "attack" : ["Shooting"],
        "mid" : ["Passing"],
        "defence" : ["Defence"]
    }

    def __init__(self):
        self.team = {
            "LW": None,
            "ST": None,
            "RW": None,
            "RM": None,
            "CM": None,
            "LM": None,
            "LB": None,
            "LCB": None,
            "RCB": None,
            "RB": None,
            "GK": None
        }

        self.teamAttributes = {
            "attack": 0,
            "mid": 0,
            "defence": 0
        }

        self.maxBalance = 1000000000
        self.balance = 1000000000

    def getTeam(self):
        return self.team

    def updateTeam(self, team):
        balance = self.verifyBalanceAfterTeamCost(team)
        if (balance > -1):
            self.team = team
            self.updateBalance(balance)
            self.updateTeamAttributes(team)
            return self.getTeam()
        else:
            return False

    def deleteTeam(self):
        for position in self.team:
            self.team[position] = None
        self.balance = self.maxBalance
        for attrib in self.teamAttributes:
            self.teamAttributes[attrib] = 0

    def getBalance(self):
        return self.balance

    def updateBalance(self, balance):
        self.balance = balance
        return self.getBalance()

    def verifyBalanceAfterTeamCost(self, team):
        return self.maxBalance - sum(player['Price'] for player in team.values() if player is not None)

    def getTeamAttributes(self):
        return self.teamAttributes

    def updateTeamAttributes(self, team):
        attribSum = {
            "attack" : 0,
            "mid" : 0,
            "defence" : 0
        }

        attackSum = 0
        midSum = 0
        defenceSum = 0

        for position in team:
            if (team[position] != None):
                if(position == "GK"):
                    attribSum["defence"] += 100 * team[position]["Rating"]
                else:
                    for teamAttrib in attribSum:
                        attribSum[teamAttrib] += (User.posTeamAttribAssoc[position][teamAttrib] * team[position]["Rating"])
                        # attribSum[teamAttrib] += (User.posTeamAttribAssoc[position][teamAttrib] * sum(team[position][attrib] for attrib in User.teamAttribAssoc[teamAttrib]))
        
        for teamAttrib in attribSum:
            self.teamAttributes[teamAttrib] = attribSum[teamAttrib]/User.attribScale[teamAttrib]

        return self.getTeamAttributes()
    
    def getRecommendedPlayers(self, playerId):
        return (getRecommendedPlayers(allPlayers.loc[allPlayers['id'] == playerId].iloc[0], allPlayers))[1:].to_dict(orient="records")


user = User()


def setPrice(rating):
    price = rating ** 3

    if(rating >= 90):
        price *= 250
    elif(rating >= 85):
        price *= 200
    elif(rating >= 80):
        price *= 150
    elif(rating >= 75):
        price *= 100
    else:
        price *= 50

    return price

posAssoc = {
    "RW": ["RW", "RM"],
    "LW": ["LW", "LM"],
    "ST": ["ST", "CF"],
    "RM": ["RM", "CM", "CAM"],
    "GK": ["GK"],
    "LM": ["LM", "CM", "CAM"],
    "CM": ["CM", "LM", "RM", "CAM", "CDM"],
    "CAM": ["CAM", "CF"],
    "CB": ["CB", "CDM"],
    "RCB": ["CB", "CDM", "RB"],
    "LCB": ["CB", "CDM", "LB"],
    "CDM": ["CDM", "RM", "LM", "CM"],
    "CF": ["CF", "CAM", "ST"],
    "LB": ["LB", "LWB"],
    "RB": ["RB", "RWB"],
    "LWB": ["LWB", "LB"],
    "RWB": ["RWB", "RB"]
}


def getRecommendedPlayers(player, df):
    df = df[df["Position"].isin(posAssoc[player.Position])]

    dfa = df.drop(["id","Name", "Position", "Rating", "Price"], axis=1)

    neigh = NearestNeighbors(n_neighbors=6)
    neigh.fit(dfa)

    return df.iloc[neigh.kneighbors(dfa.ix[player.name].values.reshape(1, -1), return_distance=False)[0]]

usecols = ["Name", "POS", "RAT", "PAC", "SHO", "PAS", "DRI", "DEF", "PHY"]
columns = ["Name", "Position", "Rating", "Pace", "Shooting",
           "Passing", "Dribbling", "Defence", "Physicality"]
allPlayers = pd.read_csv("./data/fifa16db.csv", usecols=usecols)
allPlayers.columns = columns
allPlayers.insert(0, "id", allPlayers.index)
allPlayers["Price"] = allPlayers["Rating"].apply(setPrice)


# END BUSINESS LOGIC


# API
parser = reqparse.RequestParser()
parser.add_argument('team', type=dict)
parser.add_argument('playerId', type=int, location='args')


class Players(Resource):

    def get(self):
        return allPlayers.to_dict(orient="records")


class Positions(Resource):

    def get(self):
        return posAssoc


class Team(Resource):

    def getTeamDetails(self):
        return {"team": user.getTeam(), "balance": user.getBalance(), "teamAttributes": user.getTeamAttributes()}

    def get(self):
        return self.getTeamDetails()

    def put(self):
        args = parser.parse_args()
        teamUpdate = user.updateTeam(args.team)
        if teamUpdate == False:
            abort(500, message="Insufficient funds!")
        else:
            return self.getTeamDetails()

    def delete(self):
        user.deleteTeam()
        return self.getTeamDetails()


class TeamPlayer(Resource):

    def put(self):
        user.team[player.pos] = player.id
        return user.team

    def delete(self):
        user.team[player.pos] = None
        return user.team

class RecommendedPlayers(Resource):
    def get(self):
        args = parser.parse_args()
        return user.getRecommendedPlayers(args.playerId)
# END API


# ROUTING
api.add_resource(Players, "/players")
api.add_resource(Positions, "/positions")
api.add_resource(Team, "/team")
api.add_resource(TeamPlayer, "/team-player")
api.add_resource(RecommendedPlayers, "/recommended-players")
# END ROUTING
