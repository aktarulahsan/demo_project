package com.aktar.demo.SalesInvoiceDetails;

import com.aktar.demo.product.ProductModel;
import com.aktar.demo.utill.BaseRepository;
import com.aktar.demo.utill.Response;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class SalesInvoiceDetailsRepository extends BaseRepository {

    public Response save(String reqObj) {

        SalesInvoiceDetailsModel model = objectMapperReadValue(reqObj, SalesInvoiceDetailsModel.class);
        return baseOnlySave(model);
    }

    public Response update(String reqObj) {

        SalesInvoiceDetailsModel  model = objectMapperReadValue(reqObj, SalesInvoiceDetailsModel.class);
        return baseSaveOrUpdate(model);

    }

    public Response delete(Long id) {
        if (id ==null) {
            return getErrorResponse("Id is blank");
        }

        SalesInvoiceDetailsModel  model = findById(id);

        if (model != null) {
            return baseDelete(model);
        }

        return getErrorResponse("Id not found");
    }


    ArrayList<SalesInvoiceDetailsModel> list = new ArrayList<SalesInvoiceDetailsModel>();
    public Response deleteByInvoiceId(Long id) {
        if (id ==0) {
            return getErrorResponse("Id is blank");
        }
        Response  res = findDetailsById(id);
        if(res.isSuccess()){
            list = (ArrayList<SalesInvoiceDetailsModel>) res.getItems();
            for (int i = 0; i < list.size(); i++) {
                baseDelete(list.get(i));
            }
            return res;
        }
        return getErrorResponse("Id not found");
    }
    public Response findDetailsById(Long id) {
        SalesInvoiceDetailsModel entity = new SalesInvoiceDetailsModel();
        entity.setInvoiceNumber(id);
//        roomEntity.setActiveStatus(1);
        return getListFindById(criteriaQuery(entity));
    }




    public SalesInvoiceDetailsModel findById(Long id) {

        SalesInvoiceDetailsModel model 	= new SalesInvoiceDetailsModel();
        model.setId(id);
        Response response = baseFindById(criteriaQuery(model));
        if (response.isSuccess()) {

            return getValueFromObject(response.getObj(), SalesInvoiceDetailsModel.class);
        }
        return null;
    }






    public Response list(String reqObj) {

        SalesInvoiceDetailsModel model = null;
        if (null != reqObj) {
            model = objectMapperReadValue(reqObj, SalesInvoiceDetailsModel.class);
        }
        return baseList(criteriaQuery(model));
    }

    private CriteriaQuery criteriaQuery(SalesInvoiceDetailsModel filter) {
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

    private List<Predicate> criteriaCondition(SalesInvoiceDetailsModel filter, CriteriaBuilder builder, Root<SalesInvoiceDetailsModel> root) {

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
            if (filter.getInvoiceNumber() != null && filter.getInvoiceNumber() > 0) {
                Predicate condition = builder.equal(root.get("invoiceNumber"), filter.getInvoiceNumber());
                p.add(condition);
            }


        }

        return p;
    }

    private void init() {
        initEntityManagerBuilderCriteriaQueryRoot(SalesInvoiceDetailsModel.class);
        CriteriaBuilder builder 	= super.builder;
        CriteriaQuery criteria 		= super.criteria;
        Root root 					= super.root;
    }
}
