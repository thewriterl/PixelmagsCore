package com.pixelmags.service.mapper;


import com.pixelmags.domain.*;
import com.pixelmags.service.dto.PublisherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Publisher} and its DTO {@link PublisherDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PublisherMapper extends EntityMapper<PublisherDTO, Publisher> {


    @Mapping(target = "magazines", ignore = true)
    @Mapping(target = "removeMagazines", ignore = true)
    Publisher toEntity(PublisherDTO publisherDTO);

    default Publisher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Publisher publisher = new Publisher();
        publisher.setId(id);
        return publisher;
    }
}
