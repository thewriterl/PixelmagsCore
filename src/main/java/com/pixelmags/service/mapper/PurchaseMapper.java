package com.pixelmags.service.mapper;


import com.pixelmags.domain.*;
import com.pixelmags.service.dto.PurchaseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Purchase} and its DTO {@link PurchaseDTO}.
 */
@Mapper(componentModel = "spring", uses = {SubscriptionPlanMapper.class})
public interface PurchaseMapper extends EntityMapper<PurchaseDTO, Purchase> {

    @Mapping(source = "subscription.id", target = "subscriptionId")
    PurchaseDTO toDto(Purchase purchase);

    @Mapping(source = "subscriptionId", target = "subscription")
    @Mapping(target = "customers", ignore = true)
    @Mapping(target = "removeCustomer", ignore = true)
    @Mapping(target = "magazine", ignore = true)
    Purchase toEntity(PurchaseDTO purchaseDTO);

    default Purchase fromId(Long id) {
        if (id == null) {
            return null;
        }
        Purchase purchase = new Purchase();
        purchase.setId(id);
        return purchase;
    }
}
