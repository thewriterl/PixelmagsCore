package com.pixelmags.service.mapper;


import com.pixelmags.domain.*;
import com.pixelmags.service.dto.IssueDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Issue} and its DTO {@link IssueDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface IssueMapper extends EntityMapper<IssueDTO, Issue> {


    @Mapping(target = "magazine", ignore = true)
    Issue toEntity(IssueDTO issueDTO);

    default Issue fromId(Long id) {
        if (id == null) {
            return null;
        }
        Issue issue = new Issue();
        issue.setId(id);
        return issue;
    }
}
