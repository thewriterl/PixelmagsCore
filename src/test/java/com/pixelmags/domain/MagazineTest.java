package com.pixelmags.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pixelmags.web.rest.TestUtil;

public class MagazineTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Magazine.class);
        Magazine magazine1 = new Magazine();
        magazine1.setId(1L);
        Magazine magazine2 = new Magazine();
        magazine2.setId(magazine1.getId());
        assertThat(magazine1).isEqualTo(magazine2);
        magazine2.setId(2L);
        assertThat(magazine1).isNotEqualTo(magazine2);
        magazine1.setId(null);
        assertThat(magazine1).isNotEqualTo(magazine2);
    }
}
