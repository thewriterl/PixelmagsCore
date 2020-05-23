package com.pixelmags.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pixelmags.web.rest.TestUtil;

public class MagazineDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MagazineDTO.class);
        MagazineDTO magazineDTO1 = new MagazineDTO();
        magazineDTO1.setId(1L);
        MagazineDTO magazineDTO2 = new MagazineDTO();
        assertThat(magazineDTO1).isNotEqualTo(magazineDTO2);
        magazineDTO2.setId(magazineDTO1.getId());
        assertThat(magazineDTO1).isEqualTo(magazineDTO2);
        magazineDTO2.setId(2L);
        assertThat(magazineDTO1).isNotEqualTo(magazineDTO2);
        magazineDTO1.setId(null);
        assertThat(magazineDTO1).isNotEqualTo(magazineDTO2);
    }
}
