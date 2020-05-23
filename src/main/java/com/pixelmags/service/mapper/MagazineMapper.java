package com.pixelmags.service.mapper;


import com.pixelmags.domain.*;
import com.pixelmags.service.dto.MagazineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Magazine} and its DTO {@link MagazineDTO}.
 */
@Mapper(componentModel = "spring", uses = {IssueMapper.class, PurchaseMapper.class, PublisherMapper.class})
public interface MagazineMapper extends EntityMapper<MagazineDTO, Magazine> {

    @Mapping(source = "issue.id", target = "issueId")
    @Mapping(source = "purchase.id", target = "purchaseId")
    @Mapping(source = "publisher.id", target = "publisherId")
    MagazineDTO toDto(Magazine magazine);

    @Mapping(source = "issueId", target = "issue")
    @Mapping(source = "purchaseId", target = "purchase")
    @Mapping(source = "publisherId", target = "publisher")
    Magazine toEntity(MagazineDTO magazineDTO);

    default Magazine fromId(Long id) {
        if (id == null) {
            return null;
        }
        Magazine magazine = new Magazine();
        magazine.setId(id);
        return magazine;
    }
}
