from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field
from beanie import Indexed

from app.models.malaysia_model import Malaysia

class Month(BaseModel):
    month: datetime

class StatPoc1(BaseModel):
    bcli_poc1 : Optional[float]
    cpi_poc1 : Optional[float]
    gdpt_poc1 : Optional[float]
    grb_poc1 : Optional[float]
    inf_poc1 : Optional[float]
    ipi_poc1 : Optional[float]
    lt_ir_poc1 : Optional[float]
    ppi_poc1 : Optional[float]
    st_ir_poc1 : Optional[float]
    ur_poc1 : Optional[float]
    wrt_poc1 : Optional[float]
    klse_close : Optional[float]
    klse_poc1 : Optional[float]

class StatPoc12(BaseModel):
    bcli_poc12 : Optional[float]
    cpi_poc12 : Optional[float]
    gdpt_poc12 : Optional[float]
    grb_poc12 : Optional[float]
    inf_poc12 : Optional[float]
    ipi_poc12 : Optional[float]
    lt_ir_poc12 : Optional[float]
    ppi_poc12 : Optional[float]
    st_ir_poc12 : Optional[float]
    ur_poc12 : Optional[float]
    wrt_poc12 : Optional[float]
    klse_close : Optional[float]
    klse_poc12 : Optional[float]

class StandardStat(BaseModel):
    bcli : Optional[float]
    cpi : Optional[float]
    gdpt : Optional[float]
    grb : Optional[float]
    inf : Optional[float]
    ipi : Optional[float]
    lt_ir : Optional[float]
    ppi : Optional[float]
    st_ir : Optional[float]
    ur : Optional[float]
    wrt : Optional[float]
    klse_close : Optional[float]
    klse : Optional[float]

class MarketMoodPoc1(BaseModel):
    month : datetime
    MarketMood_poc1 : Optional[float]

class MarketMoodPoc12(BaseModel):
    month : datetime
    MarketMood_poc12 : Optional[float]

class MarketMoodPoc(BaseModel):
    month : List[datetime] = Field(default_factory=list)
    MarketMood : List[Optional[float]] = Field(default_factory=list)

class MMIndexpoc1(BaseModel) :
    month : datetime
    klse_n_poc1 : Optional[float]
    MarketMood_poc1 : Optional[float]
    pred_MarketMood_poc1 : Optional[float]

class MMIndexpoc12(BaseModel) :
    month : datetime
    klse_n_poc12 : Optional[float]
    MarketMood_poc12 : Optional[float]
    pred_MarketMood_poc12 : Optional[float]

class MMIndexpoc(BaseModel):
    month : List[datetime] = Field(default_factory=list)
    klse : List[Optional[float]] = Field(default_factory=list)
    MarketMood : List[Optional[float]] = Field(default_factory=list)
    pred_MarketMood : List[Optional[float]] = Field(default_factory=list)


'''
class FeaturesPoc1(BaseModel):
    month : datetime
    bcli_poc1 : Optional[float]
    cpi_poc1 : Optional[float]
    grb_poc1 : Optional[float]
    klse_poc1 : Optional[float]
    ppi_poc1 : Optional[float]
    st_ir_poc1 : Optional[float]

class FeaturesGraphPoc1(BaseModel):
    month : List[datetime] = Field(default_factory=list)
    bcli : List[Optional[float]] = Field(default_factory=list)
    cpi : List[Optional[float]] = Field(default_factory=list)
    grb : List[Optional[float]] = Field(default_factory=list)
    klse : List[Optional[float]] = Field(default_factory=list)
    ppi : List[Optional[float]] = Field(default_factory=list)
    st_ir : List[Optional[float]] = Field(default_factory=list)

class FeaturesPoc12(BaseModel):
    month : datetime
    grb_poc12 : Optional[float]
    inf_poc12 : Optional[float]
    ppi_poc12 : Optional[float]
    st_ir_poc12 : Optional[float]

class FeaturesGraphPoc12(BaseModel):
    month : List[datetime] = Field(default_factory=list)
    grb : List[Optional[float]] = Field(default_factory=list)
    inf : List[Optional[float]] = Field(default_factory=list)
    ppi : List[Optional[float]] = Field(default_factory=list)
    st_ir : List[Optional[float]] = Field(default_factory=list)

class CmptPoc1(BaseModel):
    month: datetime
    cmpt_poc1 : Optional[float]
    pred_cmpt_poc1 : Optional[float]

class CmptPoc12(BaseModel):
    month: datetime
    cmpt_poc12 : Optional[float]
    pred_cmpt_poc12 : Optional[float]

class CmptPoc(BaseModel):
    month : List[datetime] = Field(default_factory=list)
    cmpt : List[Optional[float]] = Field(default_factory=list)
    pred_cmpt : List[Optional[float]] = Field(default_factory=list)
'''