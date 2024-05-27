from typing import Optional
from beanie import Document, Indexed
from datetime import datetime
from pydantic import Field

class Malaysia(Document):
    month: Indexed(datetime) #type: ignore
    bcli_index : Optional[float] = Field(None)
    bcli_poc1 : Optional[float] = Field(None)
    bcli_poc12 : Optional[float] = Field(None)
    cpi_index : Optional[float] = Field(None)
    cpi_poc1 : Optional[float] = Field(None)
    cpi_poc12 : Optional[float] = Field(None)
    gdpt_index : Optional[float] = Field(None)
    gdpt_poc1 : Optional[float] = Field(None)
    gdpt_poc12 : Optional[float] = Field(None)
    grb_index : Optional[float] = Field(None)
    grb_poc1 : Optional[float] = Field(None)
    grb_poc12 : Optional[float] = Field(None)
    inf_poc1 : Optional[float] = Field(None)
    inf_poc12 : Optional[float] = Field(None)
    ipi_index : Optional[float] = Field(None)
    ipi_poc1 : Optional[float] = Field(None)
    ipi_poc12 : Optional[float] = Field(None)
    lt_ir_poc1 : Optional[float] = Field(None)
    lt_ir_poc12 : Optional[float] = Field(None)
    ppi_index : Optional[float] = Field(None)
    ppi_poc1 : Optional[float] = Field(None)
    ppi_poc12 : Optional[float] = Field(None)
    st_ir_poc1 : Optional[float] = Field(None)
    st_ir_poc12 : Optional[float] = Field(None)
    ur_poc1 : Optional[float] = Field(None)
    ur_poc12 : Optional[float] = Field(None)
    wrt_index : Optional[float] = Field(None)
    wrt_poc1 : Optional[float] = Field(None)
    wrt_poc12 : Optional[float] = Field(None)
    klse_close : Optional[float] = Field(None)
    klse_poc1 : Optional[float] = Field(None)
    klse_n_poc1 : Optional[float] = Field(None)
    klse_poc12 : Optional[float] = Field(None)
    klse_n_poc12 : Optional[float] = Field(None)
    MarketMood_poc1 : Optional[float] = Field(None)
    MarketMood_poc12 : Optional[float] = Field(None)
    pred_MarketMood_poc1 : Optional[float] = Field(None)
    pred_MarketMood_poc12 : Optional[float] = Field(None)

    def __repr__(self) -> str:
        return f"<Malaysia {self.month}>"
    
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