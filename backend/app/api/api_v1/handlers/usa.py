from datetime import datetime
from fastapi import APIRouter, HTTPException, status, Depends
import pymongo
from typing import List
from bson import datetime as bson_datetime
from typing import Any

#import database models, service and schema
from app.models.usa_model import USA
from app.schemas.usa_schema import StandardStat, FeatureGraphPoc1, FeatureGraphPoc12, CmptPoc
from app.services.usa_service import USAService

usa_router = APIRouter()

def rounder(value, mul = 1):
    return (value if value == None else round(value * mul, 2))

@usa_router.get('/poc1_months', summary="Get all month list for poc1" , response_model=List[str])
async def month_list_poc1():
    month_list = await USAService.get_months_list_poc1()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@usa_router.get('/poc12_months', summary="Get all month list for poc12" , response_model=List[str])
async def month_list_poc12():
    month_list = await USAService.get_months_list_poc12()
    converted_dates = [str(entry.month.strftime("%b %y")) for entry in month_list ]
    return converted_dates

@usa_router.get('/{month}/poc1', summary="Get poc1 stat by month", response_model=StandardStat)
async def get_stat_poc1(month: str):
    month = datetime.strptime(month, "%b %y")
    data = await USAService.get_stat_poc1(month)
    #modified_data = {key.replace('_poc1', ''): value for key, value in data.model_dump().items()}
    response = StandardStat(
        bcli= rounder(data.bcli_poc1, 100),
        cpi = rounder(data.cpi_poc1, 100),
        gdpt = rounder(data.gdpt_poc1, 100),
        grb = rounder(data.grb_poc1, 100),
        inf = rounder(data.inf_poc1, 100),
        ipi = rounder(data.ipi_poc1, 100),
        lt_ir= rounder(data.lt_ir_poc1, 100),
        ppi= rounder(data.ppi_poc1, 100),
        st_ir= rounder(data.st_ir_poc1, 100),
        ur= rounder(data.ur_poc1, 100),
        wrt = rounder(data.wrt_poc1, 100),
        dji_close = rounder(data.dji_close),
        dji = rounder(data.dji_poc1, 100),
        gspc_close= rounder(data.gspc_close),
        gspc = rounder(data.gspc_poc1, 100),
        ixic_close= rounder(data.ixic_close),
        ixic= rounder(data.ixic_poc1, 100),
        vix_close= rounder(data.vix_close),
        vix= rounder(data.vix_poc1, 100),
    )
    return response

@usa_router.get('/{month}/poc12', summary="Get poc12 stat by month", response_model=StandardStat)
async def get_stat_poc12(month: str):
    month = datetime.strptime(month, "%b %y")
    data = await USAService.get_stat_poc12(month)
    #modified_data = {key.replace('_poc12', ''): value for key, value in data.model_dump().items()}
    response = StandardStat(
        bcli= rounder(data.bcli_poc12, 100),
        cpi = rounder(data.cpi_poc12, 100),
        gdpt = rounder(data.gdpt_poc12, 100),
        grb = rounder(data.grb_poc12, 100),
        inf = rounder(data.inf_poc12, 100),
        ipi = rounder(data.ipi_poc12, 100),
        lt_ir= rounder(data.lt_ir_poc12, 100),
        ppi= rounder(data.ppi_poc12, 100),
        st_ir= rounder(data.st_ir_poc12, 100),
        ur= rounder(data.ur_poc12, 100),
        wrt = rounder(data.wrt_poc12, 100),
        dji_close = rounder(data.dji_close),
        dji = rounder(data.dji_poc12, 100),
        gspc_close= rounder(data.gspc_close),
        gspc = rounder(data.gspc_poc12, 100),
        ixic_close= rounder(data.ixic_close),
        ixic= rounder(data.ixic_poc12, 100),
        vix_close= rounder(data.vix_close),
        vix= rounder(data.vix_poc12, 100),
    )
    return response

@usa_router.get('/features_poc1', summary="Get features selected for poc1", response_model=FeatureGraphPoc1)
async def get_features_poc1():
    data = await USAService.get_poc1_features()
    transformed_data = FeatureGraphPoc1()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.bcli.append(rounder(item.bcli_poc1))
        transformed_data.grb.append(rounder(item.grb_poc1))
        transformed_data.inf.append(rounder(item.inf_poc1))
        transformed_data.ipi.append(rounder(item.ipi_poc1))
        transformed_data.st_ir.append(rounder(item.st_ir_poc1))
        transformed_data.gspc.append(rounder(item.gspc_poc1))
        transformed_data.ixic.append(rounder(item.ixic_poc1))
        transformed_data.vix.append(rounder(item.vix_poc1))
    return transformed_data

@usa_router.get('/features_poc12', summary="Get features selected for poc12", response_model=FeatureGraphPoc12)
async def get_features_poc12():
    data = await USAService.get_poc12_features()
    transformed_data = FeatureGraphPoc12()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.bcli.append(rounder(item.bcli_poc12))
        transformed_data.inf.append(rounder(item.inf_poc12))
        transformed_data.lt_ir.append(rounder(item.lt_ir_poc12))
        transformed_data.ppi.append(rounder(item.ppi_poc12))
        transformed_data.gspc.append(rounder(item.gspc_poc12))
    return transformed_data

@usa_router.get('/cmpt_poc1', summary="Get composite index for poc1", response_model=CmptPoc)
async def get_features_poc1():
    data = await USAService.get_poc1_cmpt()
    transformed_data = CmptPoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.cmpt.append(rounder(item.cmpt_poc1))
        transformed_data.pred_cmpt.append(rounder(item.pred_cmpt_poc1))
    return transformed_data

@usa_router.get('/cmpt_poc12', summary="Get composite index for poc12", response_model=CmptPoc)
async def get_features_poc1():
    data = await USAService.get_poc12_cmpt()
    transformed_data = CmptPoc()
    for item in data:
        transformed_data.month.append(item.month.strftime("%b %y"))
        transformed_data.cmpt.append(rounder(item.cmpt_poc12))
        transformed_data.pred_cmpt.append(rounder(item.pred_cmpt_poc12))
    return transformed_data