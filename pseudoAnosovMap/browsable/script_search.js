//2025/12/25
//(이 프로그램 만든 시각: 24:41:38)
/*아래 코드는 GitHub ModularDiscriminant 계정의 test1 repository의
'script_Untitled11 - V1.4.js'
파일의 내용을 복사해 와서 약간 수정한 것이다. (24:45:35)*/



const nLowerBoundInput = document.getElementById("n (lower bound) input");
const nUpperBoundInput = document.getElementById("n (upper bound) input");

const ShowDataWithEpsilonEquals1Input = document.getElementById("Show data with epsilon = 1");
const ShowDataWithEpsilonEqualsNeg1Input = document.getElementById("Show data with epsilon = -1");

const lambdaLowerBoundInput = document.getElementById("lambda (lower bound) input");
const lambdaUpperBoundInput = document.getElementById("lambda (upper bound) input");

const dLowerBoundInput = document.getElementById("d (lower bound) input");
const dUpperBoundInput = document.getElementById("d (upper bound) input");

const ShowDataWithMinimalityEqualsTrueInput = document.getElementById("Show data with minimality = true");
const ShowDataWithMinimalityEqualsFalseInput = document.getElementById("Show data with minimality = false");

const nPrimeLowerBoundInput = document.getElementById("n' (lower bound) input");
const nPrimeUpperBoundInput = document.getElementById("n' (upper bound) input");

const gLowerBoundInput = document.getElementById("g (lower bound) input");
const gUpperBoundInput = document.getElementById("g (upper bound) input");

const ShowDataWithCoronalityEqualsTrueInput = document.getElementById("Show data with coronality = true");
const ShowDataWithCoronalityEqualsFalseInput = document.getElementById("Show data with coronality = false");

const ShowDataWithDetMEquals1Input = document.getElementById("Show data with det(M) = 1");
const ShowDataWithDetMEqualsNeg1Input = document.getElementById("Show data with det(M) = -1");

const SearchButton = document.getElementById("SearchButton");
const OutputTable = document.getElementById("OutputTable");



SearchButton.addEventListener("click", async function () {
    const nLowerBound = parseInt(nLowerBoundInput.value);
    const nUpperBound = parseInt(nUpperBoundInput.value);

    const ShowDataWithEpsilonEquals1 = ShowDataWithEpsilonEquals1Input.checked;
    const ShowDataWithEpsilonEqualsNeg1 = ShowDataWithEpsilonEqualsNeg1Input.checked;

    const lambdaLowerBound = parseFloat(lambdaLowerBoundInput.value);
    const lambdaUpperBound = parseFloat(lambdaUpperBoundInput.value);

    const dLowerBound = parseInt(dLowerBoundInput.value);
    const dUpperBound = parseInt(dUpperBoundInput.value);

    const ShowDataWithMinimalityEqualsTrue = ShowDataWithMinimalityEqualsTrueInput.checked;
    const ShowDataWithMinimalityEqualsFalse = ShowDataWithMinimalityEqualsFalseInput.checked;

    const nPrimeLowerBound = parseInt(nPrimeLowerBoundInput.value);
    const nPrimeUpperBound = parseInt(nPrimeUpperBoundInput.value);

    const gLowerBound = parseInt(gLowerBoundInput.value);
    const gUpperBound = parseInt(gUpperBoundInput.value);

    const ShowDataWithCoronalityEqualsTrue = ShowDataWithCoronalityEqualsTrueInput.checked;
    const ShowDataWithCoronalityEqualsFalse = ShowDataWithCoronalityEqualsFalseInput.checked;

    const ShowDataWithDetMEquals1 = ShowDataWithDetMEquals1Input.checked;
    const ShowDataWithDetMEqualsNeg1 = ShowDataWithDetMEqualsNeg1Input.checked;


    
    OutputTable.innerHTML = "Loading...";

    //const dataset = await (await fetch("BrowsableStretchFactorDatasetV1.1Size2To13.json")).json();
    //100MB가 넘는 파일의 경우 GitHub에 Git LFS를 사용해서 업로드해야 하는데, 그렇게 할 경우 어차피 GitHub Pages에서 불러올 수가 없어서... 그냥 데이터셋을 100MB 미만의 데이터셋 2개로 분할하고, 로드한 후 병합하는 방법을 써 보기로 함 (2025/12/25 26:59:31)
    const dataset = (await (await fetch("BrowsableStretchFactorDatasetV1.1Size2To12.json")).json()).concat(
        await (await fetch("BrowsableStretchFactorDatasetV1.1Size13.json")).json()
    ); //(2025/12/25 27:00:57)



    const len1 = dataset.length;
    let count = 0;
    let k1;

    let n, matrix, phi, CyclesWOCrit, Cycle1WOCrit, nPrime, MatrixPrime, phiPrime;
    let len2, len3, k2, k3;

    let HTMLTable;
    
    HTMLTable = '<table> <tr> '
        + '<th scope="col">size $n$</th> '
        + '<th scope="col">browsable matrix $M$</th> '
        + '<th scope="col">$\\epsilon$</th> '
        + '<th scope="col">permutation $\\phi$</th> '
        + '<th scope="col">characteristic polynomial $\\chi_M(x)$</th> '
        + '<th scope="col">factorization of characteristic polynomial $\\chi_M(x)$</th> '
        + '<th scope="col">closed form of browsable stretch factor (leading eigenvalue) $\\lambda$</th> '
        + '<th scope="col">numerical value of $\\lambda$</th> '
        + '<th scope="col">minimal polynomial of $\\lambda$</th> '
        + '<th scope="col">degree $d$ of $\\lambda$</th> '
        + '<th scope="col">cycles of $\\phi$ without critical points</th> '
        + '<th scope="col">minimality of $M$</th> '
        + '<th scope="col">minimalized size $n\'$</th> '
        + '<th scope="col">minimalized browsable matrix $M\'$</th> '
        + '<th scope="col">minimalized permutation $\\phi\'$</th> '
        + '<th scope="col">genus $g$</th> '
        + '<th scope="col">coronality of $\\lambda$</th> '
        + '<th scope="col">determinant $\\det(M)$</th> '
    + '</tr> ';

    for(k1 = 0; k1 < len1; k1++)
    {
        if(!Number.isNaN(nLowerBound))
        {
            if(!(nLowerBound <= dataset[k1][0]))
            {
                continue;
            }
        }
        if(!Number.isNaN(nUpperBound))
        {
            if(!(dataset[k1][0] <= nUpperBound))
            {
                continue;
            }
        }

        if((!ShowDataWithEpsilonEquals1) && (dataset[k1][2] === 1))
        {
            continue;
        }
        if((!ShowDataWithEpsilonEqualsNeg1) && (dataset[k1][2] === -1))
        {
            continue;
        }

        if(!Number.isNaN(lambdaLowerBound))
        {
            if(!(lambdaLowerBound <= dataset[k1][7]))
            {
                continue;
            }
        }
        if(!Number.isNaN(lambdaUpperBound))
        {
            if(!(dataset[k1][7] <= lambdaUpperBound))
            {
                continue;
            }
        }

        if(!Number.isNaN(dLowerBound))
        {
            if(!(dLowerBound <= dataset[k1][9]))
            {
                continue;
            }
        }
        if(!Number.isNaN(dUpperBound))
        {
            if(!(dataset[k1][9] <= dUpperBound))
            {
                continue;
            }
        }

        if((!ShowDataWithMinimalityEqualsTrue) && dataset[k1][11])
        {
            continue;
        }
        if((!ShowDataWithMinimalityEqualsFalse) && (!dataset[k1][11]))
        {
            continue;
        }

        if(!Number.isNaN(nPrimeLowerBound))
        {
            if(!(nPrimeLowerBound <= dataset[k1][12]))
            {
                continue;
            }
        }
        if(!Number.isNaN(nPrimeUpperBound))
        {
            if(!(dataset[k1][12] <= nPrimeUpperBound))
            {
                continue;
            }
        }

        if(!Number.isNaN(gLowerBound))
        {
            if(!(gLowerBound <= dataset[k1][15]))
            {
                continue;
            }
        }
        if(!Number.isNaN(gUpperBound))
        {
            if(!(dataset[k1][15] <= gUpperBound))
            {
                continue;
            }
        }

        if((!ShowDataWithCoronalityEqualsTrue) && dataset[k1][16])
        {
            continue;
        }
        if((!ShowDataWithCoronalityEqualsFalse) && (!dataset[k1][16]))
        {
            continue;
        }

        if((!ShowDataWithDetMEquals1) && (dataset[k1][17] === 1))
        {
            continue;
        }
        if((!ShowDataWithDetMEqualsNeg1) && (dataset[k1][17] === -1))
        {
            continue;
        }



        HTMLTable += "<tr> ";

            n = dataset[k1][0];
            HTMLTable += "<td>";
                HTMLTable += n.toString();
            HTMLTable += "</td> ";

            matrix = dataset[k1][1];
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    HTMLTable += matrix[0][0].toString();
                    for(k3 = 1; k3 < n; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += matrix[0][k3].toString();
                    }
                    for(k2 = 1; k2 < n; k2++)
                    {
                        HTMLTable += " \\\\ ";
                        HTMLTable += matrix[k2][0].toString();
                        for(k3 = 1; k3 < n; k3++)
                        {
                            HTMLTable += " & ";
                            HTMLTable += matrix[k2][k3].toString();
                        }
                    }
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][2].toString();
            HTMLTable += "</td> ";

            phi = dataset[k1][3];
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    HTMLTable += "0";
                    for(k3 = 1; k3 <= n; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += k3.toString();
                    }
                    HTMLTable += " \\\\ ";
                    HTMLTable += phi[0].toString();
                    for(k3 = 1; k3 <= n; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += phi[k3].toString();
                    }
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += "$" + dataset[k1][4].replace(/\*/g, "") + "$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += "$" + dataset[k1][5].replace(/\*/g, "") + "$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                if(dataset[k1][6].slice(0, 4) !== "Root")
                {
                    HTMLTable += dataset[k1][6];
                }
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][7].toString();
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += "$" + dataset[k1][8].replace(/\*/g, "") + "$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][9].toString();
            HTMLTable += "</td> ";

            CyclesWOCrit = dataset[k1][10];
            HTMLTable += "<td>";
                len2 = CyclesWOCrit.length;
                HTMLTable += "{";
                for(k2 = 0; k2 < len2; k2++)
                {
                    if(k2 !== 0)
                    {
                        HTMLTable += ", ";
                    }

                    Cycle1WOCrit = CyclesWOCrit[k2];
                    len3 = Cycle1WOCrit.length;

                    HTMLTable += "(";
                    HTMLTable += Cycle1WOCrit[0].toString();
                    for(k3 = 1; k3 < len3; k3++)
                    {
                        HTMLTable += " ";
                        HTMLTable += Cycle1WOCrit[k3].toString();
                    }
                    HTMLTable += ")";
                }
                HTMLTable += "}";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                if(dataset[k1][11])
                {
                    HTMLTable += "O";
                }
                else
                {
                    HTMLTable += "X";
                }
            HTMLTable += "</td> ";

            nPrime = dataset[k1][12];
            HTMLTable += "<td>";
                HTMLTable += nPrime.toString();
            HTMLTable += "</td> ";

            MatrixPrime = dataset[k1][13];
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    HTMLTable += MatrixPrime[0][0].toString();
                    for(k3 = 1; k3 < nPrime; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += MatrixPrime[0][k3].toString();
                    }
                    for(k2 = 1; k2 < nPrime; k2++)
                    {
                        HTMLTable += " \\\\ ";
                        HTMLTable += MatrixPrime[k2][0].toString();
                        for(k3 = 1; k3 < nPrime; k3++)
                        {
                            HTMLTable += " & ";
                            HTMLTable += MatrixPrime[k2][k3].toString();
                        }
                    }
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            phiPrime = dataset[k1][14];
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    HTMLTable += "0";
                    for(k3 = 1; k3 <= nPrime; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += k3.toString();
                    }
                    HTMLTable += " \\\\ ";
                    HTMLTable += phiPrime[0].toString();
                    for(k3 = 1; k3 <= nPrime; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += phiPrime[k3].toString();
                    }
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][15].toString();
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                if(dataset[k1][16])
                {
                    HTMLTable += "O";
                }
                else
                {
                    HTMLTable += "X";
                }
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][17].toString();
            HTMLTable += "</td> ";
        
        HTMLTable += "</tr> ";

        count++;
    }

    HTMLTable += "</table>";

    OutputTable.innerHTML = count.toString() + " data found in total <br><br> " + HTMLTable;

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "OutputTable"]);
});