package com.pixelmags.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pixelmags.web.rest.TestUtil;

public class PurchaseDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseDTO.class);
        PurchaseDTO purchaseDTO1 = new PurchaseDTO();
        purchaseDTO1.setId(1L);
        PurchaseDTO purchaseDTO2 = new PurchaseDTO();
        assertThat(purchaseDTO1).isNotEqualTo(purchaseDTO2);
        purchaseDTO2.setId(purchaseDTO1.getId());
        assertThat(purchaseDTO1).isEqualTo(purchaseDTO2);
        purchaseDTO2.setId(2L);
        assertThat(purchaseDTO1).isNotEqualTo(purchaseDTO2);
        purchaseDTO1.setId(null);
        assertThat(purchaseDTO1).isNotEqualTo(purchaseDTO2);
    }
}
