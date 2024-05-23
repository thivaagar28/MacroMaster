from typing import Optional
from beanie import Document, Indexed
from datetime import datetime
from pydantic import Field

class Malaysia(Document):
    month: Indexed(datetime) #type: ignore
    bcli_poc1 : Optional[float] = Field(None)
    bcli_poc12 : Optional[float] = Field(None)
    cpi_poc1 : Optional[float] = Field(None)
    cpi_poc12 : Optional[float] = Field(None)
    gdpt_poc1 : Optional[float] = Field(None)
    gdpt_poc12 : Optional[float] = Field(None)
    grb_poc1 : Optional[float] = Field(None)
    grb_poc12 : Optional[float] = Field(None)
    inf_poc1 : Optional[float] = Field(None)
    inf_poc12 : Optional[float] = Field(None)
    ipi_poc1 : Optional[float] = Field(None)
    ipi_poc12 : Optional[float] = Field(None)
    lt_ir_poc1 : Optional[float] = Field(None)
    lt_ir_poc12 : Optional[float] = Field(None)
    ppi_poc1 : Optional[float] = Field(None)
    ppi_poc12 : Optional[float] = Field(None)
    st_ir_poc1 : Optional[float] = Field(None)
    st_ir_poc12 : Optional[float] = Field(None)
    ur_poc1 : Optional[float] = Field(None)
    ur_poc12 : Optional[float] = Field(None)
    wrt_poc1 : Optional[float] = Field(None)
    wrt_poc12 : Optional[float] = Field(None)
    klse_close : Optional[float] = Field(None)
    klse_poc1 : Optional[float] = Field(None)
    klse_poc12 : Optional[float] = Field(None)
    cmpt_poc1 : Optional[float] = Field(None)
    cmpt_poc12 : Optional[float] = Field(None)
    pred_cmpt_poc1 : Optional[float] = Field(None)
    pred_cmpt_poc12 : Optional[float] = Field(None)

    def __repr__(self) -> str:
        return f"<USA {self.month}>"
    
    def __str__(self) -> str:
        return str(self.month)
    
    def __hash__(self) -> int:
        return hash(self.month)
    
    def __eq__(self, other: object) -> bool:
        if isinstance(other, Malaysia):
            return self.month == other.month
        return False

class Settings:
    name = "Malaysia"