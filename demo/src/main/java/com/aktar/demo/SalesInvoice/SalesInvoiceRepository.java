package com.aktar.demo.SalesInvoice;


import com.aktar.demo.SalesInvoiceDetails.SalesInvoiceDetailsService;
import com.aktar.demo.utill.BaseRepository;
import com.aktar.demo.utill.Response;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class SalesInvoiceRepository extends BaseRepository {

    @Autowired
    SalesInvoiceDetailsService detailsService;


    public Response save(String reqObj) {

        SalesInvoiceModel model = objectMapperReadValue(reqObj, SalesInvoiceModel.class);
        Date dte=new Date();
        long invoiceId = dte.getTime();

        model.setId(invoiceId);
        model.setInvoiceDate(dte);

        Response response = new Response();
        response = baseOnlySave(model);
        if (response.isSuccess()){
            for (int i = 0; i <model.getDetailsList().size(); i++) {
                model.getDetailsList().get(i).setInvoiceNumber(invoiceId);
                model.getDetailsList().get(i).setLineNumber(i);
                model.getDetailsList().get(i).setId(null);
                response= baseOnlySave(model.getDetailsList().get(i));
            }
        }



        return response;
    }

    public Response update(String reqObj) {

        SalesInvoiceModel  model = objectMapperReadValue(reqObj, SalesInvoiceModel.class);
        Response response = new Response();
        response = baseUpdate(model);

        response= detailsService.deleteByInvoiceId(model.getId());

        if (response.isSuccess()){
            for (int i = 0; i <model.getDetailsList().size(); i++) {
                model.getDetailsList().get(i).setInvoiceNumber(model.getId());
                model.getDetailsList().get(i).setLineNumber(i);
                model.getDetailsList().get(i).setId(null);
                response= baseSaveOrUpdate(model.getDetailsList().get(i));
            }
        }
        return baseSaveOrUpdate(model);

    }

    public Response delete(Long id) {
        if (id ==null) {
            return getErrorResponse("Id is blank");
        }
        Response response = new Response();
        response= detailsService.deleteByInvoiceId(id);
        if (response.isSuccess()){
            SalesInvoiceModel  model = findById(id);

            if (model != null) {
                return baseDelete(model);
            }
        }
        return getErrorResponse("Id not found");
    }

    public SalesInvoiceModel findById(Long id) {

        SalesInvoiceModel model 	= new SalesInvoiceModel();
        model.setId(id);
        Response response = baseFindById(criteriaQuery(model));
        if (response.isSuccess()) {

            return getValueFromObject(response.getObj(), SalesInvoiceModel.class);
        }
        return null;
    }






    public Response list(String reqObj) {

        SalesInvoiceModel role = null;
        if (null != reqObj) {
            role = objectMapperReadValue(reqObj, SalesInvoiceModel.class);
        }
        return baseList(criteriaQuery(role));
    }

    private CriteriaQuery criteriaQuery(SalesInvoiceModel filter) {
        init();

        List<Predicate> p 	= new ArrayList<Predicate>();
        p = criteriaCondition(filter, null, null);

        if (!CollectionUtils.isEmpty(p)) {
            Predicate[] pArray 	= p.toArray(new Predicate[] {});
            Predicate predicate = builder.and(pArray);
            criteria.where(predicate);
        }
        return criteria;
    }

    private List<Predicate> criteriaCondition(SalesInvoiceModel filter, CriteriaBuilder builder, Root<SalesInvoiceModel> root) {

        if (builder == null) {
            builder 		= super.builder;
        }
        if (root == null) {
            root 			= super.root;
        }

        List<Predicate> p 	= new ArrayList<Predicate>();

        if (filter != null) {


            if (filter.getId() != null && filter.getId() > 0) {
                Predicate condition = builder.equal(root.get("id"), filter.getId());
                p.add(condition);
            }


        }

        return p;
    }

    private void init() {
        initEntityManagerBuilderCriteriaQueryRoot(SalesInvoiceModel.class);
        CriteriaBuilder builder 	= super.builder;
        CriteriaQuery criteria 		= super.criteria;
        Root root 					= super.root;
    }
}
