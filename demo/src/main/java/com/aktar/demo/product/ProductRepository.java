package com.aktar.demo.product;


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
public class ProductRepository extends BaseRepository {


    public Response save(String reqObj) {

        ProductModel model = objectMapperReadValue(reqObj, ProductModel.class);
        return baseOnlySave(model);
    }

    public Response update(String reqObj) {

        ProductModel  model = objectMapperReadValue(reqObj, ProductModel.class);
        return baseSaveOrUpdate(model);

    }

    public Response delete(Long id) {
        if (id ==null) {
            return getErrorResponse("Id is blank");
        }

        ProductModel  model = findById(id);

        if (model != null) {
            return baseDelete(model);
        }

        return getErrorResponse("Id not found");
    }

    public ProductModel findById(Long id) {

        ProductModel model 	= new ProductModel();
        model.setId(id);
        Response response = baseFindById(criteriaQuery(model));
        if (response.isSuccess()) {

            return getValueFromObject(response.getObj(), ProductModel.class);
        }
        return null;
    }






    public Response list(String reqObj) {

        ProductModel role = null;
        if (null != reqObj) {
            role = objectMapperReadValue(reqObj, ProductModel.class);
        }
        return baseList(criteriaQuery(role));
    }

    private CriteriaQuery criteriaQuery(ProductModel filter) {
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

    private List<Predicate> criteriaCondition(ProductModel filter, CriteriaBuilder builder, Root<ProductModel> root) {

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
        initEntityManagerBuilderCriteriaQueryRoot(ProductModel.class);
        CriteriaBuilder builder 	= super.builder;
        CriteriaQuery criteria 		= super.criteria;
        Root root 					= super.root;
    }
}
