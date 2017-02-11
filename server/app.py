from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors


### APP SETUP
app = Flask(__name__)
CORS(app)
api = Api(app)
### END APP SETUP


### BUSINESS LOGIC
def setPrice(rating):
    price = rating ** 2
    
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
    "RW" : ["RW", "RM"],
    "LW" : ["LW", "LM"],
    "ST" : ["ST", "CF"],
    "RM" : ["RM", "CM", "CAM"],
    "GK" : ["GK"],
    "LM" : ["LM", "CM", "CAM"],
    "CM" : ["CM", "LM", "RM", "CAM", "CDM"],
    "CAM" : ["CAM", "CF"],
    "CB" : ["CB", "CDM", "LB", "RB"],
    "CDM" : ["CDM", "RM", "LM", "CM"],
    "CF" : ["CF", "CAM", "ST"],
    "LB" : ["LB", "CB", "LWB"],
    "RB" : ["RB", "CB", "RWB"],
    "LWB" : ["LWB", "LB"],
    "RWB" : ["RWB", "RB"]
}

def getRecommendedPlayers(player, df):

    df = df[df["Position"].isin(posAssoc[player.Position])]

    dfi = df.ix[:,["Name", "Position"]]
    dfa = df.drop(["Name", "Position", "Rating"], axis=1)

    neigh = NearestNeighbors(n_neighbors=5)
    neigh.fit(dfa)

    return df.iloc[neigh.kneighbors(dfa.ix[player.name].values.reshape(1,-1), return_distance=False)[0]]

usecols = ["Name", "POS", "RAT", "PAC", "SHO", "PAS", "DRI", "DEF", "PHY"]
columns = ["Name", "Position", "Rating", "Pace", "Shooting", "Passing", "Dribbling", "Defence", "Physicality"]
df = pd.read_csv("./data/fifa16db.csv", usecols=usecols)
df.columns = columns
df.insert(0, "id", df.index)
df["Price"] = df["Rating"].apply(setPrice)

team = {
    "LW" : None,
    "ST" : None,
    "RW" : None,
    "RM" : None,
    "CM" : None,
    "LM" : None,
    "LB" : None,
    "LCB" : None,
    "RCB" : None,
    "RB" : None,
    "GK" : None
}


### END BUSINESS LOGIC


### API
class Players(Resource):
    def get(self):
        return df.to_dict(orient="records")

class Positions(Resource):
    def get(self):
        return posAssoc

class Team(Resource):
    def get(self):
        return team

class TeamPlayer(Resource):
    def put(self, player):
        team[player.pos] = player.id
        return team

    def delete(self, player):
        team[player.pos] = None
        return team
### END API 


### ROUTING
api.add_resource(Players, "/players")
api.add_resource(Positions, "/positions")
api.add_resource(Team, "/team")
api.add_resource(TeamPlayer, "/team-player/<player>")
### END ROUTING
