package com.aktar.demo.utill;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.hibernate.jpa.QueryHints;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import java.util.List;

public class BaseRepository implements CommonFunctions {
    private final Logger LOGGER = LoggerFactory.getLogger(BaseRepository.class);
    public CriteriaBuilder builder = null;
    public CriteriaQuery criteria = null;
    public Root root = null;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private Environment env;



    public void initEntityManagerBuilderCriteriaQueryRoot(Class clazz) {
        criteriaRoot(clazz);
    }
    public Root criteriaRoot(Class clazz) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery criteria = builder.createQuery(clazz);
        Root root = criteria.from(clazz);
        this.builder = builder;

        this.criteria = criteria;
        this.root = root;

        return root;
    }

    public Response baseOnlySave(Object obj) {
        Response response = new Response();
        try {
            entityManager.persist(obj);
            response.setObj(obj);
            return getSuccessResponse("Saved Successfully", response);
        } catch (Exception e) {
            e.printStackTrace();
            // TODO: handle exception
            response.setMessage(e.toString());
            return getErrorResponse("Save fail !!",response);
        }

    }


    public Response baseList(CriteriaQuery criteria) {
        Response response = new Response();
        List list = null;
        try {
            list = entityManager.createQuery(criteria).setHint(QueryHints.HINT_READONLY, true).getResultList();

            if(list.size() > 0) {
                response.setData(list);
                return getSuccessResponse("Data found ", response);
            }

            return getSuccessResponse("Data Empty " );
        } catch (Exception e) {
            // TODO: handle exception
            return getErrorResponse("Error!! with - -  "+e.getMessage());
        }

    }
    public Response getListFindById(CriteriaQuery criteria) {
        Response response = new Response();
        Object obj = null;
        try {
            obj = entityManager.createQuery(criteria).getResultList();
            response.setItems((List) obj);
            return getSuccessResponse("Successfully", response);
        } catch (Exception e) {
            // TODO: handle exception
            return getErrorResponse("Error!! with - - "+ e.getMessage());
        }

    }


    public Response baseDelete(Object obj) {
        try {
            entityManager.remove(obj);
            return getSuccessResponse("Delete Successfully");
        } catch (Exception e) {
            return getErrorResponse("Delete fail !!"+e.getMessage());
        }

    }


    public Response baseUpdate(Object obj) {
        Response response = new Response();
        try {
            System.out.println(entityManager.merge(obj));
            response.setObj(entityManager.merge(obj));

            response.setObj(obj);
            return getSuccessResponse("Updated Successfully",response);
        } catch (Exception e) {
            e.printStackTrace();
            // TODO: handle exception
            return getErrorResponse("Update fail !!"+e.getMessage());
        }

    }
    public Response baseSaveOrUpdate(Object obj) {
        Response response = new Response();
        try {
            response.setObj(entityManager.merge(obj));
            entityManager.flush();
//            entityManager.get
            return getSuccessResponse("Update Successfully", response);
        } catch (Exception e) {
            // TODO: handle exception
            System.err.println(e.getCause().getMessage());
            return getErrorResponse("Save fail !!");
        }

    }

    public Response baseFindById(CriteriaQuery criteria) {
        Response response = new Response();
        Object obj = null;
        try {
            obj = entityManager.createQuery(criteria).getSingleResult();
            response.setObj(obj);
            return getSuccessResponse("Successfully", response);
        } catch (Exception e) {
            // TODO: handle exception
            return getErrorResponse("Error !!"+ e.getMessage());
        }

    }




}
