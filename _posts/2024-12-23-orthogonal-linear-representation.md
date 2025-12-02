---
katex: True
layout: post
category: notes
title: Orthogonal linear representation
snippet: EVD, SVD and their application in PCA, LDA and ICA
tags: [data science]
---
- TOC
{:toc .toc}
---

Let's say that we have a bunch of $$d$$-dimensional vectors
$$\mathbf{x}_i\in\mathbb{R}^d$$, $$i\in \{1, \dots, n\}$$ (throughout this
text we will assume $$n\ge d$$, i.e. the number of vectors is at least
equal to the size of the vectors). We can put all of these vectors
side-by-side in the form of a matrix
$$\mathbf{X} = [\mathbf{x}_1, \dots, \mathbf{x}_n]\in \mathbb{R}^{d\times n}$$.
We call this matrix $$\mathbf{X}$$ as the "data matrix," and the vectors
$$\mathbf{x}_i$$ as "data samples" or just "samples." We represent the
"labels" with the symbol $$y_i\in \{1, 0\},$$ for $$i\in \{1, \dots, n\}$$.
Also stacking these together in the form of a vector
$$\mathbf{y} = [y_1, \dots, y_n]^\top \in\mathbb{R}^n$$, we call this the
"label vector".

The "dimension" of a vector is the number of elements in it. For
example, the dimension of all the vectors $$\mathbf{x}_i\in\mathbb{R}^d$$
in the above section is $$d$$. Sometimes, we might want to reduce the
dimension of a vector, but still retain the "essence" of the vector. We
can represent these smaller vectors as $$\mathbf{z}_i\in\mathbb{R}^p$$,
$$p < d$$. And we call these smaller vectors as "representations/features"
of $$\mathbf{x}_i$$. We will discuss later how we can get $$\mathbf{z}_i$$
given some $$\mathbf{x}_i$$ (and maybe also $$y_i$$). The definition of
"essence" can pretty much be anything, but we will discuss 2 main ideas
in Sections [4](#pca) and [5](#lda) that correspond to *orthogonal linear representations*.

In the context of *orthogonal linear representations*, we might also be
interested in a representation that separates out a mixture of signals
into its 'independent' components. We discuss this Section [6](#ica).

# Eigen Value Decomposition (EVD) {#evd}

For any square matrix $$\mathbf{X}\in\mathbb{R}^{n\times n}$$, we have $$n$$
"eigenvalues" $$\lambda_i\in\mathbb{R}$$ and corresponding "eigenvectors"
$$\mathbf{u}_i\in\mathbb{R}^{n}$$. Eigenvalues and eigenvectors are
special in the sense that for eah pair the following equation holds

<div id="eq:evd1">
$$
\mathbf{X}\mathbf{u}_i = \lambda_i\mathbf{u}_i\;. \tag{1}
$$
</div>

To get an intuitive understanding of the equation ([1](#eq:evd1)),
watch [this video](https://www.youtube.com/watch?v=PFDu9oVAE-g). It turns out that
matrix $$\mathbf{X}$$ can be "decomposed" into the product of (square)
matrices of its eigenvalues and eigenvectors.

<div id="eq:evd2">
$$
\begin{aligned}
\mathbf{X} &= \begin{bmatrix}
\mathbf{u}_1 & \dots & \mathbf{u}_n\end{bmatrix}
\begin{bmatrix}
\lambda_1& & \\
& \ddots &\\
& & \lambda_n
\end{bmatrix}
\begin{bmatrix}
\mathbf{u}_1 & \dots & \mathbf{u}_n\end{bmatrix}^{-1}\\
&= \mathbf{U} \mathbf{\Lambda} \mathbf{U}^{-1} \tag{2}
\end{aligned}
$$
</div>

This is what we call "Eigen Value Decomposition" (EVD). Note that these
eigenvalues and eigenvectors in $$\mathbf{\Lambda}$$ and $$\mathbf{U}$$
don't have any particular order.

# Singular Value Decomposition (SVD) {#svd}

It turns out that any (not necessarily square) matrix
$$\mathbf{X}\in \mathbb{R}^{d\times n}$$ can be "decomposed" into the
product of three matrices as

<div id="eq:svd1">
$$
\begin{aligned}
\mathbf{X} &= \overbrace{\begin{bmatrix}
\mathbf{u}_1 & \dots & \mathbf{u}_d\end{bmatrix}}^{\in\mathbb{R}^{d\times d}}
\overbrace{\left[
  \begin{matrix}
    \sigma_1 &  &  \\
     & \ddots &  \\
     &  & \sigma_d \\
  \end{matrix}
  \left|
    \,
    \begin{matrix}
        \\
      \mathbf{0}_{d\times(n-d)}  \\
        \\
    \end{matrix}
  \right.
\right]}^{\in\mathbb{R}^{d\times n}}
\overbrace{\begin{bmatrix}
\mathbf{v}_1 & \dots & \mathbf{v}_n\end{bmatrix}^\top}^{\in\mathbb{R}^{n\times n}} \\
&= \mathbf{U} \mathbf{\Sigma} \mathbf{V}^\top\;, \tag{3}
\end{aligned}
$$
</div>

where $$\mathbf{U}$$ and $$\mathbf{V}$$ are "orthonormal" matrices, which
just means that $$\mathbf{U}^\top\mathbf{U} = \mathbf{I}_d$$, or in other
words $$\mathbf{U}^\top=\mathbf{U}^{-1}$$ and $$\mathbf{\Sigma}$$ is a
diagonal matrix (not necessarily square). $$\sigma_i$$ are called
"singular values" and $$\mathbf{u}_i\in\mathbb{R}^d$$ and
$$\mathbf{v}_i\in\mathbb{R}^n$$ are called left and right "singular
vectors" respectively. And, interestingly, there is a descending order
to the singular values in $$\mathbf{\Sigma}$$ and they are also all
non-negative, i.e. $$\sigma_1 \ge \dots \ge \sigma_d \ge 0$$.

## SVD vs. EVD {#svdVsEvd}

There is a very close relationship between EVD and SVD. This can be seen
by substituting the SVD of $$\mathbf{X}$$ from
([3](#eq:svd1)) in
$$\mathbf{X}\mathbf{X}^\top$$ and $$\mathbf{X}^\top\mathbf{X}$$.

<div id="eq:svdVsEvd1">
$$
\begin{aligned}
\mathbf{X}\mathbf{X}^\top &= \big(\mathbf{U} \mathbf{\Sigma} \mathbf{V}^\top\big) \big(\mathbf{U} \mathbf{\Sigma} \mathbf{V}^\top\big)^\top \\ 
 &= \big(\mathbf{U} \mathbf{\Sigma} \mathbf{V}^\top\big)\big(\mathbf{V} \mathbf{\Sigma} \mathbf{U}^\top\big) \\
  &= \mathbf{U} \mathbf{\Sigma} \mathbf{V}^\top \mathbf{V} \mathbf{\Sigma} \mathbf{U}^\top \\
    &= \mathbf{U} \mathbf{\Sigma} \mathbf{I}_n \mathbf{\Sigma} \mathbf{U}^\top \\
  &= \mathbf{U} \mathbf{\Sigma} \mathbf{\Sigma} \mathbf{U}^\top \\
  &= \mathbf{U} \mathbf{\Sigma}^2 \mathbf{U}^\top \\
  &= \mathbf{U} \mathbf{\Sigma}^2 \mathbf{U}^{-1} \tag{4}
\end{aligned}
$$
</div>

Here, we have used the fact that
$$(\mathbf{A}\mathbf{B})^\top = \mathbf{B}^\top\mathbf{A}^\top$$.
Equations ([4](#eq:svdVsEvd1)) and
([2](#eq:evd2)) are similar. Therefore, $$\mathbf{U}$$ is the matrix of eigenvectors of
$$\mathbf{X}\mathbf{X}^\top$$ and, similarly, $$\mathbf{V}$$ is the matrix
of eigenvectors of $$\mathbf{X}^\top\mathbf{X}$$. In each case,
$$\mathbf{\Sigma}^2$$ is the eigenvalue matrix.

# Principal Component Analysis (PCA) {#pca}

Principal Component Analysis (PCA) is a special (and arguably the most
famous) dimensionality reduction technique. Let's first go over the
steps of PCA and we shall discuss the intuition and motivation behind it
shortly after.

Given a data matrix
$$\mathbf{X} = [\mathbf{x}_1, \dots, \mathbf{x}_n]\in \mathbb{R}^{d\times n}$$,
we wish to reduce the dimension of the data from $$d$$ to $$k<d$$ to get
smaller versions $$\mathbf{z}_i$$ of each sample $$\mathbf{x}_i$$. We carry
out the following steps to get the so called "principal components\" and
"score matrix\" of the data.

1.  Calculate the "mean\" of the data

    $$
    \boldsymbol{\mu} = \frac{1}{n}\sum_{i=1}^n\mathbf{x}_i = \frac{1}{n}\mathbf{X}\mathbf{1}_n\;.
    $$

2.  Calculate the "centered\" data matrix[^1]

    $$
    \begin{aligned}
    \bar{\mathbf{X}} &= \mathbf{X} - \boldsymbol{\mu}\otimes\mathbf{1}_n^\top\\
    &=\begin{bmatrix}
    (\mathbf{x}_1 - \boldsymbol{\mu})& \dots & (\mathbf{x}_n - \boldsymbol{\mu})\end{bmatrix}\\
    &=\begin{bmatrix}
    {\bar{\mathbf{x}}}_1 & \dots & {\bar{\mathbf{x}}}_n\end{bmatrix}\in\mathbb{R}^{d\times n}\;.
    \end{aligned}
    $$
    
    Beyond this point, it would be better for the reader
    to consider $$\mathbf{X}$$ and $$\bar{\mathbf{X}}$$ as essentially the
    same for ease of understanding.

3.  Perform the SVD on
    $$\bar{\mathbf{X}} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^\top$$.

4.  Throw away all but the first $$k$$ "singular vectors" (columns) from
    $$\mathbf{U}=\begin{bmatrix}
    \mathbf{u}_1 & \dots & \mathbf{u}_d\end{bmatrix}$$ to get a smaller
    matrix $$\mathbf{U}_k=\begin{bmatrix}
    \mathbf{u}_1 & \dots & \mathbf{u}_k\end{bmatrix}\in\mathbb{R}^{d\times k}$$.
    This matrix is called the matrix of $$k$$ "principal components" of
    $$\mathbf{X}$$.

5.  The matrix
    $$\mathbf{Z}=\mathbf{U}_k^\top\bar{\mathbf{X}}=\begin{bmatrix}
    \mathbf{z}_1 & \dots & \mathbf{z}_n\end{bmatrix}\in\mathbb{R}^{k\times n}$$
    is called the "score matrix" of $$\mathbf{X}$$, where each "score
    vector" $$\mathbf{z}_i\in\mathbb{R}^{k}$$ is a low-dimensional version
    of the corresponding data sample $$\mathbf{x}_i\in\mathbb{R}^{d}$$.

One interesting thing to note here is that given $$\mathbf{Z}$$ and
$$\mathbf{U}_k$$ that were obtained from PCA, we can "reconstruct" an
"approximate" version of the original (centered) data matrix
$$\bar{\mathbf{X}}$$ as
$$\widehat{\bar{\mathbf{X}}} = \mathbf{U}_k\mathbf{Z} = \mathbf{U}_k\mathbf{U}_k^\top\bar{\mathbf{X}}=\begin{bmatrix}
\widehat{\bar{\mathbf{x}}}_1 & \dots & \widehat{\bar{\mathbf{x}}}_n\end{bmatrix}\in\mathbb{R}^{d\times n}$$.
These "approximations" $$\widehat{\bar{\mathbf{x}}}_i$$ of samples
$${\bar{\mathbf{x}}}_i$$ are also called the "projections" of
$${\bar{\mathbf{x}}}_i$$ onto the "space spanned by the principal
components." For a new, previously unseen sample
$$\mathbf{x}_\text{new}$$, we perform only steps 2 and 5 to get
$$\mathbf{z}_\text{new}$$.

Now that we have discussed the precise steps of PCA, we can discuss the
intuition behind it.

## Minimum residual view of PCA

Imagine we have the (centered) data samples in $$\mathbb{R}^d$$ (e.g.,
$$d=2$$). Our goal is to find a different version of this data that
instead lies in $$\mathbb{R}^k$$, which is a lower-dimensional space for
$$k<d$$ (e.g., $$k=1$$). Then, PCA can be thought of as "finding" this
low-dimensional "linear"[^2] space such that, on average, the difference
(also called "residual") between any sample $$\bar{\mathbf{x}}_i$$ and its
projection $$\widehat{\bar{\mathbf{x}}}_i$$ onto the low-dimensional space
is as small as possible. The unit vectors (also called "basis vectors"
or just "basis") of this low-dimensional space are precisely the
principal components $$\mathbf{u}_i$$ (therefore there are $$k$$ unit
vectors for a $$k$$-dimensional space).

## Maximum variance view of PCA

The principal components of the data are vectors along the maximum
variance directions of the data. The first principal component lies
along the direction of highest variance. The second principal component
lies along the direction of second highest variance, and so on. The
score vectors $$\mathbf{z}_i$$ are then the "projections"[^3]
$$\widehat{\bar{\mathbf{x}}}_i$$ of the original (centered) samples
$$\bar{\mathbf{x}}_i$$ onto a linear-subsapce with unit-vectors
$${\mathbf{u}}_j$$, but viewed in the sup-sapce instead of the original
space.

# Linear Discriminant Analysis (LDA) {#lda}

Linear Discriminant Analysis (LDA) is a dimensionality reduction
technique that utilizes class labels to find directions that maximize
the separability between classes. Given the data matrix
$$\mathbf{X} = [\mathbf{x}_1, \dots, \mathbf{x}_n] \in \mathbb{R}^{d \times n}$$
and the label vector
$$\mathbf{y} = [y_1, \dots, y_n]^\top \in \{0, 1\}^n$$, LDA aims to
project the data into a lower-dimensional space such that the projected
samples $$\mathbf{z}_i \in \mathbb{R}^k$$ (with $$k < d$$) maximize the
class separability.

The steps to perform LDA are as follows:

1.  Compute the mean vector of the entire dataset:

    $$
    \boldsymbol{\mu} = \frac{1}{n} \sum_{i=1}^n \mathbf{x}_i = \frac{1}{n} \mathbf{X} \mathbf{1}_n \in \mathbb{R}^d\;.
    $$

2.  Compute the mean vector for each class $$c \in \{0, 1\}$$:
    
    $$
    \boldsymbol{\mu}_c = \frac{1}{n_c} \sum_{i \in \mathcal{C}_c} \mathbf{x}_i = \frac{1}{n_c} \mathbf{X}_c \mathbf{1}_{n_c} \in \mathbb{R}^d\;,
    $$
    
    where $$\mathcal{C}_c = \{i : y_i = c\}$$,
    $$\mathbf{X}_c \in \mathbb{R}^{d \times n_c}$$ contains the samples
    from class $$c$$, and $$n_c = |\mathcal{C}_c|$$ is the number of samples
    in class $$c$$.

3.  Compute the within-class scatter matrix:

    $$
    \begin{aligned}
    \mathbf{S}_\text{W} &= \sum_{c=0}^1 \sum_{i \in \mathcal{C}_c} (\mathbf{x}_i - \boldsymbol{\mu}_c)(\mathbf{x}_i - \boldsymbol{\mu}_c)^\top\\
    &= \sum_{c=0}^1 (\mathbf{X}_c - \boldsymbol{\mu}_c \otimes \mathbf{1}_{n_c}^\top)(\mathbf{X}_c - \boldsymbol{\mu}_c \otimes \mathbf{1}_{n_c}^\top)^\top \in \mathbb{R}^{d \times d}\;.
    \end{aligned}
    $$

4.  Compute the between-class scatter matrix:
    
    $$
    \mathbf{S}_\text{B} = \sum_{c=0}^1 n_c (\boldsymbol{\mu}_c - \boldsymbol{\mu})(\boldsymbol{\mu}_c - \boldsymbol{\mu})^\top \in \mathbb{R}^{d \times d}\;.
    $$

5.  Solve the generalized eigenvalue problem:

    $$
    \mathbf{S}_\text{W}^{-1} \mathbf{S}_\text{B} \mathbf{w}_i = \lambda_i \mathbf{w}_i\;,
    $$
    
    where $$\mathbf{w}_i \in \mathbb{R}^d$$ are the
    eigenvectors and $$\lambda_i \in \mathbb{R}$$ are the eigenvalues.
    Sort the eigenvectors by decreasing eigenvalue magnitude.

6.  Select the top $$k$$ eigenvectors $$\mathbf{w}_1, \dots, \mathbf{w}_k$$
    to form the projection matrix
    $$\mathbf{W} = \begin{bmatrix} \mathbf{w}_1 & \dots & \mathbf{w}_k \end{bmatrix} \in \mathbb{R}^{d \times k}$$.

7.  Project the data into the lower-dimensional space:

    $$
    \mathbf{Z} = \mathbf{W}^\top \mathbf{X} \in \mathbb{R}^{k \times n}\;.
    $$

LDA ensures that the projected data $$\mathbf{Z}$$ maximizes the ratio of
between-class variance to within-class variance in the lower-dimensional
space.

# Independent Component Analysis (ICA) {#ica}

Independent Component Analysis (ICA) is a dimensionality reduction
technique aimed at finding a representation of the data where the
components are statistically independent. Unlike PCA or LDA, ICA does
not rely on variance or class labels but instead focuses on higher-order
statistical independence.

Given the data matrix
$$\mathbf{X} = [\mathbf{x}_1, \dots, \mathbf{x}_n] \in \mathbb{R}^{d \times n}$$,
ICA assumes that $$\mathbf{X}$$ is a linear mixture of independent
components. This means:

$$
\mathbf{X} = \mathbf{A} \mathbf{S}\;,
$$

where $$\mathbf{A} \in \mathbb{R}^{d \times d}$$ is the
mixing matrix, and
$$\mathbf{S} = [\mathbf{s}_1, \dots, \mathbf{s}_n] \in \mathbb{R}^{d \times n}$$
contains the independent components $$\mathbf{s}_i \in \mathbb{R}^d$$. The
goal of ICA is to find an unmixing matrix
$$\mathbf{W} \in \mathbb{R}^{d \times d}$$ such that:

$$
\mathbf{S} = \mathbf{W} \mathbf{X}\;,
$$

where the rows of $$\mathbf{S}$$ are as statistically independent as possible.

The steps to perform ICA are as follows:

1.  Center the data matrix $$\mathbf{X}$$ by subtracting the mean vector
    $$\boldsymbol{\mu} = \frac{1}{n} \mathbf{X} \mathbf{1}_n$$:
    
    $$
    \bar{\mathbf{X}} = \mathbf{X} - \boldsymbol{\mu} \otimes \mathbf{1}_n^\top\;.
    $$

2.  Whiten the data matrix $$\bar{\mathbf{X}}$$ to remove correlations
    between features:
    
    $$
    \mathbf{X}_\text{white} = \mathbf{D}^{-\frac{1}{2}} \mathbf{E}^\top \bar{\mathbf{X}}\;,
    $$
    
    where $$\mathbf{D}$$ and $$\mathbf{E}$$ are obtained
    from the eigenvalue decomposition
    $$\mathbf{C} = \bar{\mathbf{X}} \bar{\mathbf{X}}^\top = \mathbf{E} \mathbf{D} \mathbf{E}^\top$$.

3.  Use an iterative algorithm (e.g., FastICA) to estimate the unmixing
    matrix $$\mathbf{W}$$ such that the components of
    $$\mathbf{S} = \mathbf{W} \mathbf{X}_\text{white}$$ are statistically
    independent (not within the scope of this text!).

4.  The independent components are given by:

    $$
    \mathbf{S} = \mathbf{W} \mathbf{X}\;.
    $$

ICA is commonly used in applications such as blind source separation,
where the goal is to recover original signals from mixed observations
(e.g., separating audio sources recorded by multiple microphones).

[^1]: The "Kronecker product" of matrices $$\mathbf{A} = \begin{bmatrix}
    a_{1, 1}& a_{1, 2} \\
    a_{2, 1} & a_{2, 2}
    \end{bmatrix}$$ and $$\mathbf{B} = \begin{bmatrix}
    b_{1, 1}& b_{1, 2} \\
    b_{2, 1} & b_{2, 2}
    \end{bmatrix}$$ is defined as
    $$\mathbf{A}\otimes\mathbf{B} := \begin{bmatrix}
    a_{1, 1}\mathbf{B}& a_{1, 2}\mathbf{B} \\
    a_{2, 1}\mathbf{B} & a_{2, 2}\mathbf{B}
    \end{bmatrix}$$.

[^2]: A linear space means just what it sounds like --- something that
    looks like a line. For example, a line drawn on a piece of paper is
    a $$1$$-dimensional linear "sub-space" that lies in a higher
    $$2$$-dimensional space, the paper.

[^3]: the orthogonal projection of some $$\mathbf{a}$$ onto a "linear
    sub-space" is basically the closest point $$\hat{\mathbf{a}}$$ to
    $${\mathbf{a}}$$ that lies on that linear sub-space
