from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field
from beanie import Indexed

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
    dji_close : Optional[float]
    dji_poc1 : Optional[float]
    gspc_close : Optional[float]
    gspc_poc1 : Optional[float]
    ixic_close : Optional[float]
    ixic_poc1 : Optional[float]
    vix_close : Optional[float]
    vix_poc1 : Optional[float]

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
    dji_close : Optional[float]
    dji_poc12 : Optional[float]
    gspc_close : Optional[float]
    gspc_poc12 : Optional[float]
    ixic_close : Optional[float]
    ixic_poc12 : Optional[float]
    vix_close : Optional[float]
    vix_poc12 : Optional[float]

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
    dji_close : Optional[float]
    dji : Optional[float]
    gspc_close : Optional[float]
    gspc : Optional[float]
    ixic_close : Optional[float]
    ixic : Optional[float]
    vix_close : Optional[float]
    vix : Optional[float]

class FeaturesPoc1(BaseModel):
    month : datetime
    bcli_poc1 : Optional[float]
    grb_poc1 : Optional[float]
    inf_poc1 : Optional[float]
    ipi_poc1 : Optional[float]
    st_ir_poc1 : Optional[float]
    gspc_poc1 : Optional[float]
    ixic_poc1 : Optional[float]
    vix_poc1 : Optional[float]

class FeatureGraphPoc1(BaseModel):
    month : List[datetime] = Field(default_factory=list)
    bcli : List[Optional[float]] = Field(default_factory=list)
    grb : List[Optional[float]] = Field(default_factory=list)
    inf : List[Optional[float]] = Field(default_factory=list)
    ipi : List[Optional[float]] = Field(default_factory=list)
    st_ir : List[Optional[float]] = Field(default_factory=list)
    gspc : List[Optional[float]] = Field(default_factory=list)
    ixic : List[Optional[float]] = Field(default_factory=list)
    vix : List[Optional[float]] = Field(default_factory=list)

class FeaturesPoc12(BaseModel):
    month : datetime
    bcli_poc12 : Optional[float]
    inf_poc12 : Optional[float]
    lt_ir_poc12 : Optional[float]
    ppi_poc12 : Optional[float]
    gspc_poc12 : Optional[float]

class FeatureGraphPoc12(BaseModel):
    month : List[datetime] = Field(default_factory=list)
    bcli : List[Optional[float]] = Field(default_factory=list)
    inf : List[Optional[float]] = Field(default_factory=list)
    lt_ir : List[Optional[float]] = Field(default_factory=list)
    ppi : List[Optional[float]] = Field(default_factory=list)
    gspc : List[Optional[float]] = Field(default_factory=list)

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