package com.pixelmags.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Issue.
 */
@Entity
@Table(name = "issue")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Issue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "edicao")
    private String edicao;

    @Column(name = "manchete")
    private String manchete;

    @Column(name = "data_lancamento")
    private LocalDate dataLancamento;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "numero_paginas")
    private Integer numeroPaginas;

    @Column(name = "url")
    private String url;

    @Lob
    @Column(name = "cover_thumbnail")
    private byte[] coverThumbnail;

    @Column(name = "cover_thumbnail_content_type")
    private String coverThumbnailContentType;

    @OneToOne(mappedBy = "issue")
    @JsonIgnore
    private Magazine magazine;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEdicao() {
        return edicao;
    }

    public Issue edicao(String edicao) {
        this.edicao = edicao;
        return this;
    }

    public void setEdicao(String edicao) {
        this.edicao = edicao;
    }

    public String getManchete() {
        return manchete;
    }

    public Issue manchete(String manchete) {
        this.manchete = manchete;
        return this;
    }

    public void setManchete(String manchete) {
        this.manchete = manchete;
    }

    public LocalDate getDataLancamento() {
        return dataLancamento;
    }

    public Issue dataLancamento(LocalDate dataLancamento) {
        this.dataLancamento = dataLancamento;
        return this;
    }

    public void setDataLancamento(LocalDate dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

    public String getDescricao() {
        return descricao;
    }

    public Issue descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getNumeroPaginas() {
        return numeroPaginas;
    }

    public Issue numeroPaginas(Integer numeroPaginas) {
        this.numeroPaginas = numeroPaginas;
        return this;
    }

    public void setNumeroPaginas(Integer numeroPaginas) {
        this.numeroPaginas = numeroPaginas;
    }

    public String getUrl() {
        return url;
    }

    public Issue url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public byte[] getCoverThumbnail() {
        return coverThumbnail;
    }

    public Issue coverThumbnail(byte[] coverThumbnail) {
        this.coverThumbnail = coverThumbnail;
        return this;
    }

    public void setCoverThumbnail(byte[] coverThumbnail) {
        this.coverThumbnail = coverThumbnail;
    }

    public String getCoverThumbnailContentType() {
        return coverThumbnailContentType;
    }

    public Issue coverThumbnailContentType(String coverThumbnailContentType) {
        this.coverThumbnailContentType = coverThumbnailContentType;
        return this;
    }

    public void setCoverThumbnailContentType(String coverThumbnailContentType) {
        this.coverThumbnailContentType = coverThumbnailContentType;
    }

    public Magazine getMagazine() {
        return magazine;
    }

    public Issue magazine(Magazine magazine) {
        this.magazine = magazine;
        return this;
    }

    public void setMagazine(Magazine magazine) {
        this.magazine = magazine;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Issue)) {
            return false;
        }
        return id != null && id.equals(((Issue) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Issue{" +
            "id=" + getId() +
            ", edicao='" + getEdicao() + "'" +
            ", manchete='" + getManchete() + "'" +
            ", dataLancamento='" + getDataLancamento() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", numeroPaginas=" + getNumeroPaginas() +
            ", url='" + getUrl() + "'" +
            ", coverThumbnail='" + getCoverThumbnail() + "'" +
            ", coverThumbnailContentType='" + getCoverThumbnailContentType() + "'" +
            "}";
    }
}
