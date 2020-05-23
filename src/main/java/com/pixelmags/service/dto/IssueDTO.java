package com.pixelmags.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.pixelmags.domain.Issue} entity.
 */
public class IssueDTO implements Serializable {
    
    private Long id;

    private String edicao;

    private String manchete;

    private LocalDate dataLancamento;

    private String descricao;

    private Integer numeroPaginas;

    private String url;

    @Lob
    private byte[] coverThumbnail;

    private String coverThumbnailContentType;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEdicao() {
        return edicao;
    }

    public void setEdicao(String edicao) {
        this.edicao = edicao;
    }

    public String getManchete() {
        return manchete;
    }

    public void setManchete(String manchete) {
        this.manchete = manchete;
    }

    public LocalDate getDataLancamento() {
        return dataLancamento;
    }

    public void setDataLancamento(LocalDate dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getNumeroPaginas() {
        return numeroPaginas;
    }

    public void setNumeroPaginas(Integer numeroPaginas) {
        this.numeroPaginas = numeroPaginas;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public byte[] getCoverThumbnail() {
        return coverThumbnail;
    }

    public void setCoverThumbnail(byte[] coverThumbnail) {
        this.coverThumbnail = coverThumbnail;
    }

    public String getCoverThumbnailContentType() {
        return coverThumbnailContentType;
    }

    public void setCoverThumbnailContentType(String coverThumbnailContentType) {
        this.coverThumbnailContentType = coverThumbnailContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IssueDTO)) {
            return false;
        }

        return id != null && id.equals(((IssueDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "IssueDTO{" +
            "id=" + getId() +
            ", edicao='" + getEdicao() + "'" +
            ", manchete='" + getManchete() + "'" +
            ", dataLancamento='" + getDataLancamento() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", numeroPaginas=" + getNumeroPaginas() +
            ", url='" + getUrl() + "'" +
            ", coverThumbnail='" + getCoverThumbnail() + "'" +
            "}";
    }
}
