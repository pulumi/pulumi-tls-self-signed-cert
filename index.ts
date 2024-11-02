// Copyright 2016-2024, Pulumi Corporation.

import { singleComponentHost } from "./lib/provider";
import {SelfSignedCertificate} from "./selfSignedCert";

singleComponentHost(SelfSignedCertificate);
