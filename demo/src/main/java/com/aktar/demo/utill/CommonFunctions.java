package com.aktar.demo.utill;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.*;

public interface CommonFunctions {




    default Response getSuccessResponse(String message) {
        Response response = new Response();
        response.setSuccess(true);
        response.setMessage(message);
        return response;
    }

    default Response getSuccessResponse(String message, Response response) {
        response.setSuccess(true);
        response.setMessage(message);
        return response;
    }

    default Response getErrorResponse(String message) {
        Response response = new Response();
        response.setSuccess(false);
        response.setMessage(message);
        return response;
    }

    default Response getErrorResponse(String message, Response response) {
        response.setSuccess(false);
        response.setMessage(message);
        return response;
    }


    String SECURED_READ_SCOPE = "#oauth2.hasScope('read')";

    default String strsingleQuotation(String val) {
        String[] values = val.split(",");
        StringBuilder str = new StringBuilder();
        for (int j = 0; j < values.length; j++) {
            if (j > 0) {
                str.append(",");
            }
            String valuesPattern = "'";
            valuesPattern += values[j];
            valuesPattern += "'";
            str.append(valuesPattern);

        }
        return str.toString();
    }

    String SECURED_WRITE_SCOPE = "#oauth2.hasScope('write')";
    String SECURED_PATTERN = "/api/**";




    long salutationList = 1005l;









    default <T> T objectMapperReadValue(String content, Class<T> valueType) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {

            return objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false).readValue(content, valueType);

        } catch (JsonParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
        //  return null;
    }

    @SuppressWarnings("unchecked")
    default <T> T getValueFromObject(Object data, Class<T> clazz) {
        if (data == null) {
            return null;
        }
        return (T) data;
    }




}
